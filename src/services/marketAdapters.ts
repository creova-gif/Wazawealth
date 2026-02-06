// WAZA WEALTH — Market Adapters
// Abstraction layer for DSE, NSE, Global, Crypto exchanges

import { Currency, Exchange, Asset, Order, OrderType } from '@/types/portfolio';

/**
 * Base Market Adapter interface
 * Each exchange implements this contract
 */
interface MarketAdapter {
  market: Exchange;
  orderTypes: OrderType[];
  currency: Currency;
  settlementDays: number; // T+N
  tradingHours: {
    open: string; // HH:MM
    close: string; // HH:MM
    timezone: string;
  };
  minOrderValue: number;
  
  // Methods
  getAssets(): Promise<Asset[]>;
  getAssetPrice(assetId: string): Promise<number>;
  placeOrder(order: Order): Promise<{ orderId: string; status: string }>;
  cancelOrder(orderId: string): Promise<boolean>;
  getMarketStatus(): Promise<'open' | 'closed' | 'pre_open'>;
}

/**
 * 🇹🇿 DSE (Dar es Salaam Stock Exchange) Adapter
 * Integration via licensed Tanzanian broker + CDC Tanzania
 */
export class DSEAdapter implements MarketAdapter {
  market: Exchange = 'DSE';
  orderTypes: OrderType[] = ['market', 'limit'];
  currency: Currency = 'TZS';
  settlementDays = 2; // T+2
  tradingHours = {
    open: '10:00',
    close: '15:00',
    timezone: 'Africa/Dar_es_Salaam'
  };
  minOrderValue = 100000; // TZS 100,000 minimum
  
  private brokerApiUrl: string;
  private apiKey: string;
  
  constructor(brokerApiUrl: string, apiKey: string) {
    this.brokerApiUrl = brokerApiUrl;
    this.apiKey = apiKey;
  }
  
  async getAssets(): Promise<Asset[]> {
    // Real implementation would call broker API
    // GET /api/v1/assets?exchange=DSE
    const response = await this.callBrokerAPI('/assets?exchange=DSE');
    
    return response.assets.map((asset: any) => ({
      assetId: asset.isin,
      symbol: asset.ticker,
      name: asset.name,
      assetClass: 'stock',
      exchange: 'DSE',
      currency: 'TZS',
      currentPrice: asset.price,
      change24h: asset.change,
      changePercent24h: asset.changePercent,
      riskLevel: this.calculateRiskLevel(asset.volatility),
      dividendYield: asset.dividendYield,
      regulatoryFlags: {
        availableInTZ: true,
        availableInKE: false,
        requiresAdvancedKYC: false,
        riskDisclosureRequired: false
      }
    }));
  }
  
  async getAssetPrice(assetId: string): Promise<number> {
    // GET /api/v1/price/{assetId}
    const response = await this.callBrokerAPI(`/price/${assetId}`);
    return response.price;
  }
  
  async placeOrder(order: Order): Promise<{ orderId: string; status: string }> {
    // POST /api/v1/orders
    // Broker handles actual DSE submission
    const response = await this.callBrokerAPI('/orders', 'POST', {
      asset_id: order.assetId,
      side: order.side,
      order_type: order.orderType,
      quantity: order.quantity,
      limit_price: order.limitPrice?.amount,
      time_in_force: order.timeInForce
    });
    
    return {
      orderId: response.order_id,
      status: response.status
    };
  }
  
  async cancelOrder(orderId: string): Promise<boolean> {
    // DELETE /api/v1/orders/{orderId}
    const response = await this.callBrokerAPI(`/orders/${orderId}`, 'DELETE');
    return response.success;
  }
  
  async getMarketStatus(): Promise<'open' | 'closed' | 'pre_open'> {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;
    
    const openTime = 10 * 60; // 10:00
    const closeTime = 15 * 60; // 15:00
    
    if (currentTime >= openTime && currentTime < closeTime) {
      return 'open';
    } else if (currentTime >= 9 * 60 && currentTime < openTime) {
      return 'pre_open';
    } else {
      return 'closed';
    }
  }
  
  private async callBrokerAPI(endpoint: string, method: string = 'GET', body?: any) {
    // Simulated API call
    // Real implementation uses fetch/axios with authentication
    console.log(`DSE Broker API: ${method} ${endpoint}`, body);
    
    // Mock response
    return {
      success: true,
      assets: [],
      price: 450,
      order_id: `DSE-${Date.now()}`,
      status: 'pending'
    };
  }
  
  private calculateRiskLevel(volatility: number): 'low' | 'moderate' | 'high' | 'very_high' {
    if (volatility < 10) return 'low';
    if (volatility < 20) return 'moderate';
    if (volatility < 30) return 'high';
    return 'very_high';
  }
}

/**
 * 🇰🇪 NSE (Nairobi Securities Exchange) Adapter
 * Integration via licensed Kenyan broker + CDSC
 */
export class NSEAdapter implements MarketAdapter {
  market: Exchange = 'NSE';
  orderTypes: OrderType[] = ['market', 'limit', 'stop_loss'];
  currency: Currency = 'KES';
  settlementDays = 3; // T+3
  tradingHours = {
    open: '09:00',
    close: '15:00',
    timezone: 'Africa/Nairobi'
  };
  minOrderValue = 10000; // KES 10,000 minimum
  
  private brokerApiUrl: string;
  private apiKey: string;
  
  constructor(brokerApiUrl: string, apiKey: string) {
    this.brokerApiUrl = brokerApiUrl;
    this.apiKey = apiKey;
  }
  
  async getAssets(): Promise<Asset[]> {
    // Similar to DSE but for NSE
    return [];
  }
  
  async getAssetPrice(assetId: string): Promise<number> {
    return 0;
  }
  
  async placeOrder(order: Order): Promise<{ orderId: string; status: string }> {
    return { orderId: '', status: '' };
  }
  
  async cancelOrder(orderId: string): Promise<boolean> {
    return false;
  }
  
  async getMarketStatus(): Promise<'open' | 'closed' | 'pre_open'> {
    return 'closed';
  }
}

/**
 * 🌍 Global Market Adapter (International ETFs & Stocks)
 * Integration via international broker-dealer (custodial)
 */
export class GlobalMarketAdapter implements MarketAdapter {
  market: Exchange = 'GLOBAL';
  orderTypes: OrderType[] = ['market', 'limit'];
  currency: Currency = 'USD';
  settlementDays = 2; // T+2
  tradingHours = {
    open: '09:30',
    close: '16:00',
    timezone: 'America/New_York'
  };
  minOrderValue = 10; // USD 10 minimum
  
  async getAssets(): Promise<Asset[]> {
    return [];
  }
  
  async getAssetPrice(assetId: string): Promise<number> {
    return 0;
  }
  
  async placeOrder(order: Order): Promise<{ orderId: string; status: string }> {
    return { orderId: '', status: '' };
  }
  
  async cancelOrder(orderId: string): Promise<boolean> {
    return false;
  }
  
  async getMarketStatus(): Promise<'open' | 'closed' | 'pre_open'> {
    return 'closed';
  }
}

/**
 * 🪙 Crypto Adapter (Country-gated, regulated liquidity provider)
 * Only enabled for allowed countries + advanced KYC
 */
export class CryptoAdapter {
  market: Exchange = 'CRYPTO';
  orderTypes: OrderType[] = ['market', 'limit'];
  currency: Currency = 'USD';
  
  // Feature flag logic
  isEnabled(country: 'TZ' | 'KE', kycLevel: string): boolean {
    // Tanzania: Crypto not allowed
    if (country === 'TZ') return false;
    
    // Kenya: Allowed with advanced KYC
    if (country === 'KE' && kycLevel === 'advanced') return true;
    
    return false;
  }
  
  async getAssets(country: 'TZ' | 'KE', kycLevel: string): Promise<Asset[]> {
    if (!this.isEnabled(country, kycLevel)) {
      return []; // Return empty if not enabled
    }
    
    // Only top-cap assets (BTC, ETH, etc.)
    return [
      {
        assetId: 'crypto-btc',
        symbol: 'BTC',
        name: 'Bitcoin',
        assetClass: 'crypto',
        exchange: 'CRYPTO',
        currency: 'USD',
        currentPrice: 43250,
        change24h: -820,
        changePercent24h: -1.9,
        riskLevel: 'very_high',
        regulatoryFlags: {
          availableInTZ: false,
          availableInKE: true,
          requiresAdvancedKYC: true,
          riskDisclosureRequired: true
        }
      }
    ];
  }
  
  async placeOrder(
    order: Order,
    country: 'TZ' | 'KE',
    kycLevel: string
  ): Promise<{ orderId: string; status: string }> {
    if (!this.isEnabled(country, kycLevel)) {
      throw new Error('Crypto trading not available in your country or requires advanced KYC');
    }
    
    // Call crypto liquidity provider API
    return { orderId: `CRYPTO-${Date.now()}`, status: 'pending' };
  }
}

/**
 * Market Registry - Single source of truth for all markets
 */
export class MarketRegistry {
  private adapters: Map<Exchange, MarketAdapter> = new Map();
  
  registerAdapter(adapter: MarketAdapter) {
    this.adapters.set(adapter.market, adapter);
  }
  
  getAdapter(exchange: Exchange): MarketAdapter | undefined {
    return this.adapters.get(exchange);
  }
  
  async getAllAssets(): Promise<Asset[]> {
    const allAssets: Asset[] = [];
    
    for (const adapter of this.adapters.values()) {
      const assets = await adapter.getAssets();
      allAssets.push(...assets);
    }
    
    return allAssets;
  }
  
  async placeOrder(order: Order): Promise<{ orderId: string; status: string }> {
    const adapter = this.adapters.get(order.exchange);
    
    if (!adapter) {
      throw new Error(`No adapter found for exchange: ${order.exchange}`);
    }
    
    return adapter.placeOrder(order);
  }
}

/**
 * Initialize market adapters
 */
export function initializeMarkets(): MarketRegistry {
  const registry = new MarketRegistry();
  
  // Register DSE
  const dseAdapter = new DSEAdapter(
    process.env.DSE_BROKER_API_URL || 'https://api.broker.tz',
    process.env.DSE_API_KEY || ''
  );
  registry.registerAdapter(dseAdapter);
  
  // Register NSE
  const nseAdapter = new NSEAdapter(
    process.env.NSE_BROKER_API_URL || 'https://api.broker.ke',
    process.env.NSE_API_KEY || ''
  );
  registry.registerAdapter(nseAdapter);
  
  // Register Global
  const globalAdapter = new GlobalMarketAdapter();
  registry.registerAdapter(globalAdapter);
  
  return registry;
}
