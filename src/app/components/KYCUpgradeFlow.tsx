// WAZA WEALTH — KYC Upgrade Flow
// Basic → Advanced verification (regulatory compliant)

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Shield, 
  CheckCircle, 
  Upload, 
  Camera, 
  AlertCircle,
  Lock,
  Globe
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { KYCLevel } from '@/types/portfolio';

interface Props {
  currentLevel: KYCLevel;
  language: 'sw' | 'en';
  onClose: () => void;
  onComplete: (newLevel: KYCLevel) => void;
}

type UpgradeStep = 'benefits' | 'id_upload' | 'address_upload' | 'selfie' | 'review' | 'processing';

export function KYCUpgradeFlow({ currentLevel, language, onClose, onComplete }: Props) {
  const [step, setStep] = useState<UpgradeStep>('benefits');
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [addressProof, setAddressProof] = useState<File | null>(null);
  const [selfiePhoto, setSelfiePhoto] = useState<File | null>(null);

  const content = {
    sw: {
      upgradeKYC: 'Boresha Uthibitishaji',
      currentTier: 'Kiwango cha Sasa',
      upgradeTo: 'Boresha hadi',
      basic: 'Msingi',
      advanced: 'Iliyoendelea',
      benefits: 'Faida',
      requirements: 'Mahitaji',
      continue: 'Endelea',
      upload: 'Pakia',
      takePhoto: 'Chukua Picha',
      cancel: 'Ghairi',
      submit: 'Wasilisha',
      processing: 'Inachakata...',
      whyUpgrade: 'Kwa nini Kuboresha?',
      benefit1: 'Fikia masoko ya kimataifa',
      benefit2: 'Wekeza katika crypto (inapatikana)',
      benefit3: 'Kikomo cha juu cha amana',
      benefit4: 'Akaunti nyingi za sarafu',
      requirement1: 'Kitambulisho cha Serikali',
      requirement1Desc: 'NIDA, Pasipoti, au Kitambulisho cha Mpiga Kura',
      requirement2: 'Uthibitisho wa Anwani',
      requirement2Desc: 'Bili ya huduma au taarifa ya benki',
      requirement3: 'Uthibitishaji wa Selfie',
      requirement3Desc: 'Shikilia kitambulisho chako karibu na uso wako',
      uploadID: 'Pakia Kitambulisho',
      uploadAddress: 'Pakia Uthibitisho wa Anwani',
      takeSelfie: 'Chukua Selfie',
      idUploaded: 'Kitambulisho Kimepakiwa',
      addressUploaded: 'Anwani Imepakiwa',
      selfieUploaded: 'Selfie Imepakiwa',
      reviewDocs: 'Pitia Nyaraka Zako',
      allDocsReady: 'Nyaraka zote ziko tayari kwa ukaguzi',
      processingTitle: 'Uthibitishaji Unaendelea',
      processingDesc: 'Timu yetu inakagua nyaraka zako. Hii kawaida inachukua siku 1-2 za biashara.',
      securityNote: 'Data yako imesimbwa na salama. Hatuwezi kushiriki bila ruhusa.',
      close: 'Funga'
    },
    en: {
      upgradeKYC: 'Upgrade Verification',
      currentTier: 'Current Tier',
      upgradeTo: 'Upgrade to',
      basic: 'Basic',
      advanced: 'Advanced',
      benefits: 'Benefits',
      requirements: 'Requirements',
      continue: 'Continue',
      upload: 'Upload',
      takePhoto: 'Take Photo',
      cancel: 'Cancel',
      submit: 'Submit',
      processing: 'Processing...',
      whyUpgrade: 'Why Upgrade?',
      benefit1: 'Access international markets',
      benefit2: 'Invest in crypto (where available)',
      benefit3: 'Higher deposit limits',
      benefit4: 'Multi-currency accounts',
      requirement1: 'Government ID',
      requirement1Desc: 'NIDA, Passport, or Voter ID',
      requirement2: 'Proof of Address',
      requirement2Desc: 'Utility bill or bank statement',
      requirement3: 'Selfie Verification',
      requirement3Desc: 'Hold your ID next to your face',
      uploadID: 'Upload ID',
      uploadAddress: 'Upload Address Proof',
      takeSelfie: 'Take Selfie',
      idUploaded: 'ID Uploaded',
      addressUploaded: 'Address Uploaded',
      selfieUploaded: 'Selfie Uploaded',
      reviewDocs: 'Review Your Documents',
      allDocsReady: 'All documents are ready for review',
      processingTitle: 'Verification In Progress',
      processingDesc: 'Our team is reviewing your documents. This typically takes 1-2 business days.',
      securityNote: 'Your data is encrypted and secure. We never share it without permission.',
      close: 'Close'
    }
  };

  const t = content[language];

  const handleFileUpload = (file: File, type: 'id' | 'address' | 'selfie') => {
    switch (type) {
      case 'id':
        setIdDocument(file);
        setStep('address_upload');
        break;
      case 'address':
        setAddressProof(file);
        setStep('selfie');
        break;
      case 'selfie':
        setSelfiePhoto(file);
        setStep('review');
        break;
    }
  };

  const handleSubmit = () => {
    setStep('processing');
    // Simulate upload delay
    setTimeout(() => {
      onComplete('advanced');
    }, 2000);
  };

  const renderContent = () => {
    switch (step) {
      case 'benefits':
        return (
          <div className="space-y-6">
            {/* Current vs Target */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 border-zinc-200 bg-zinc-50">
                <p className="text-xs text-zinc-500 mb-1">{t.currentTier}</p>
                <p className="text-lg font-medium">{t.basic}</p>
              </Card>
              <Card className="p-4 border-blue-200 bg-blue-50">
                <p className="text-xs text-blue-600 mb-1">{t.upgradeTo}</p>
                <p className="text-lg font-medium text-blue-900">{t.advanced}</p>
              </Card>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-sm font-medium mb-3">{t.whyUpgrade}</h3>
              <Card className="p-5 border-zinc-200">
                <div className="space-y-3">
                  {[t.benefit1, t.benefit2, t.benefit3, t.benefit4].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-zinc-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-sm font-medium mb-3">{t.requirements}</h3>
              <div className="space-y-3">
                {[
                  { title: t.requirement1, desc: t.requirement1Desc },
                  { title: t.requirement2, desc: t.requirement2Desc },
                  { title: t.requirement3, desc: t.requirement3Desc }
                ].map((req, idx) => (
                  <Card key={idx} className="p-4 border-zinc-200">
                    <p className="text-sm font-medium mb-1">{idx + 1}. {req.title}</p>
                    <p className="text-xs text-zinc-600">{req.desc}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Security Note */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex gap-3">
                <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-blue-900">{t.securityNote}</p>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 h-14 border-2"
              >
                {t.cancel}
              </Button>
              <Button
                onClick={() => setStep('id_upload')}
                className="flex-1 h-14 bg-black text-white hover:bg-zinc-800"
              >
                {t.continue}
              </Button>
            </div>
          </div>
        );

      case 'id_upload':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">{t.uploadID}</h3>
              <p className="text-sm text-zinc-600">{t.requirement1Desc}</p>
            </div>

            <Card className="p-8 border-2 border-dashed border-zinc-300 hover:border-zinc-400 transition-colors">
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'id')}
                className="hidden"
                id="id-upload"
              />
              <label htmlFor="id-upload" className="cursor-pointer block text-center">
                <Upload className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
                <p className="text-sm font-medium mb-1">{t.upload}</p>
                <p className="text-xs text-zinc-500">JPG, PNG, or PDF</p>
              </label>
            </Card>
          </div>
        );

      case 'address_upload':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">{t.uploadAddress}</h3>
              <p className="text-sm text-zinc-600">{t.requirement2Desc}</p>
            </div>

            {/* ID Status */}
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-900">{t.idUploaded}</span>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 border-dashed border-zinc-300 hover:border-zinc-400 transition-colors">
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'address')}
                className="hidden"
                id="address-upload"
              />
              <label htmlFor="address-upload" className="cursor-pointer block text-center">
                <Upload className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
                <p className="text-sm font-medium mb-1">{t.upload}</p>
                <p className="text-xs text-zinc-500">Utility bill or bank statement</p>
              </label>
            </Card>
          </div>
        );

      case 'selfie':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">{t.takeSelfie}</h3>
              <p className="text-sm text-zinc-600">{t.requirement3Desc}</p>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <Card className="p-3 bg-green-50 border-green-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-900">{t.idUploaded}</span>
                </div>
              </Card>
              <Card className="p-3 bg-green-50 border-green-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-900">{t.addressUploaded}</span>
                </div>
              </Card>
            </div>

            <Card className="p-8 border-2 border-dashed border-zinc-300 hover:border-zinc-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                capture="user"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'selfie')}
                className="hidden"
                id="selfie-upload"
              />
              <label htmlFor="selfie-upload" className="cursor-pointer block text-center">
                <Camera className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
                <p className="text-sm font-medium mb-1">{t.takePhoto}</p>
                <p className="text-xs text-zinc-500">{language === 'sw' ? 'Shikilia kitambulisho' : 'Hold your ID'}</p>
              </label>
            </Card>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">{t.reviewDocs}</h3>
              <p className="text-sm text-zinc-600">{t.allDocsReady}</p>
            </div>

            <div className="space-y-2">
              {[
                { label: t.idUploaded, file: idDocument },
                { label: t.addressUploaded, file: addressProof },
                { label: t.selfieUploaded, file: selfiePhoto }
              ].map((doc, idx) => (
                <Card key={idx} className="p-4 bg-green-50 border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-900">{doc.label}</span>
                    </div>
                    {doc.file && (
                      <span className="text-xs text-green-700">{doc.file.name}</span>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">
                    {language === 'sw' ? 'Ni nini kinachofuata?' : "What's next?"}
                  </p>
                  <p>
                    {language === 'sw'
                      ? 'Timu yetu itakagua nyaraka zako ndani ya siku 1-2 za biashara. Tutakujulisha matokeo.'
                      : "Our team will review your documents within 1-2 business days. We'll notify you of the results."}
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 h-14 border-2"
              >
                {t.cancel}
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 h-14 bg-black text-white hover:bg-zinc-800"
              >
                {t.submit}
              </Button>
            </div>
          </div>
        );

      case 'processing':
        return (
          <div className="py-12 text-center space-y-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-600 mx-auto"
            />
            <div>
              <h3 className="text-xl font-medium mb-2">{t.processingTitle}</h3>
              <p className="text-sm text-zinc-600 max-w-sm mx-auto">{t.processingDesc}</p>
            </div>
            <Button
              onClick={onClose}
              variant="outline"
              className="h-12 px-8 border-2"
            >
              {t.close}
            </Button>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        {step !== 'processing' && (
          <div className="sticky top-0 bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
            <h2 className="text-xl font-light">{t.upgradeKYC}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="px-6 py-6">
          {renderContent()}
        </div>
      </motion.div>
    </motion.div>
  );
}