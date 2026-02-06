import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronRight, Sparkles, TrendingUp, Shield, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface OnboardingTutorialProps {
  language: 'sw' | 'en';
  onComplete: () => void;
}

export function OnboardingTutorial({ language, onComplete }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
}