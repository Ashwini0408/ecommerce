import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import  Navbar  from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { ArrowLeft, ArrowRight, ClipboardList, User, Dumbbell, Target, Ruler, Camera, Upload, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import heroMeasurement from "../../assets/hero-measurement.png";

const TOTAL_STEPS = 6;

const stepInfo = [
  { icon: ClipboardList, title: "Basic Information" },
  { icon: User, title: "Body Context" },
  { icon: Dumbbell, title: "Activity & Muscle" },
  { icon: Target, title: "Fit & Goal" },
  { icon: Ruler, title: "Body Structure" },
  { icon: Camera, title: "Upload Images" },
];

const Measurement = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    heightUnit: "cm",
    weight: "",
    weightUnit: "kg",
    fatDistribution: "",
    bodyType: "",
    activityLevel: "",
    muscleLevel: "",
    measurementGoal: "",
    fitPreference: "",
    shoulderType: "",
    frontImage: null as File | null,
    sideImage: null as File | null,
  });
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [sidePreview, setSidePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const heightInputRef = useRef<HTMLInputElement>(null);
  const weightInputRef = useRef<HTMLInputElement>(null);
  const fatDistributionSelectRef = useRef<HTMLSelectElement>(null);
  const bodyTypeSelectRef = useRef<HTMLSelectElement>(null);
  const activityLevelSelectRef = useRef<HTMLSelectElement>(null);
  const muscleLevelSelectRef = useRef<HTMLSelectElement>(null);
  const measurementGoalSelectRef = useRef<HTMLSelectElement>(null);
  const fitPreferenceSelectRef = useRef<HTMLSelectElement>(null);
  const shoulderTypeSelectRef = useRef<HTMLSelectElement>(null);
  const frontUploadRef = useRef<HTMLLabelElement>(null);
  const sideUploadRef = useRef<HTMLLabelElement>(null);

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (type: "front" | "side", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (type === "front") {
      setFormData((prev) => ({ ...prev, frontImage: file }));
      setFrontPreview(url);
    } else {
      setFormData((prev) => ({ ...prev, sideImage: file }));
      setSidePreview(url);
    }
  };

  const canNext = () => {
    switch (currentStep) {
      case 1: return formData.age && formData.height && formData.weight;
      case 2: return formData.fatDistribution && formData.bodyType;
      case 3: return formData.activityLevel && formData.muscleLevel;
      case 4: return formData.measurementGoal && formData.fitPreference;
      case 5: return formData.shoulderType;
      case 6: return formData.frontImage && formData.sideImage;
      default: return false;
    }
  };

  const scrollToField = (field: HTMLElement | null) => {
    if (!field) return;

    const targetTop = field.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });

    window.setTimeout(() => {
      if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLSelectElement ||
        field instanceof HTMLTextAreaElement ||
        field instanceof HTMLButtonElement
      ) {
        field.focus({ preventScroll: true });
        return;
      }

      if (field.tabIndex >= -1) {
        field.focus({ preventScroll: true });
      }
    }, 250);
  };

  const getFirstIncompleteField = (): HTMLElement | null => {
    switch (currentStep) {
      case 1:
        if (!formData.age) return ageInputRef.current;
        if (!formData.height) return heightInputRef.current;
        if (!formData.weight) return weightInputRef.current;
        return null;
      case 2:
        if (!formData.fatDistribution) return fatDistributionSelectRef.current;
        if (!formData.bodyType) return bodyTypeSelectRef.current;
        return null;
      case 3:
        if (!formData.activityLevel) return activityLevelSelectRef.current;
        if (!formData.muscleLevel) return muscleLevelSelectRef.current;
        return null;
      case 4:
        if (!formData.measurementGoal) return measurementGoalSelectRef.current;
        if (!formData.fitPreference) return fitPreferenceSelectRef.current;
        return null;
      case 5:
        if (!formData.shoulderType) return shoulderTypeSelectRef.current;
        return null;
      case 6:
        if (!formData.frontImage) return frontUploadRef.current;
        if (!formData.sideImage) return sideUploadRef.current;
        return null;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (!canNext()) {
      toast.error("Please fill in all required fields");
      window.requestAnimationFrame(() => {
        scrollToField(getFirstIncompleteField());
      });
      return;
    }
    if (currentStep < TOTAL_STEPS) setCurrentStep((s) => s + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = () => {
    if (!canNext()) {
      toast.error("Please upload both front and side view images");
      window.requestAnimationFrame(() => {
        scrollToField(getFirstIncompleteField());
      });
      return;
    }
    setSubmitted(true);
    toast.success("Your measurements have been submitted successfully! We'll get back to you shortly.");
  };

  if (submitted) {
    return (
      <>
        <section className="relative h-[56vh] min-h-[420px] max-h-[620px] overflow-hidden bg-primary text-primary-foreground">
          <Navbar />
          <div className="absolute inset-0">
            <img
              src={heroMeasurement}
              alt="AI Body Measurement System"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/70 to-primary/60" />
          </div>
          <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pt-20 text-center">
            <div className="container mx-auto">
              <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-4 mb-6"
              >
                <div className="w-8 h-px bg-primary-foreground/60" />
                <p className="text-primary-foreground/80 font-sans tracking-[0.3em] text-xs uppercase">
                  Measurement
                </p>
                <div className="w-8 h-px bg-primary-foreground/60" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-serif text-5xl md:text-7xl leading-[1.1] mb-8 text-primary-foreground"
              >
                Submission
                <br />
                <span className="italic text-accent">Successful</span>
              </motion.h1>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto px-6"
          >
            <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary text-lg font-bold">—</span>
              <h2 className="font-serif text-3xl text-foreground">Thank You!</h2>
            </div>
            <p className="text-muted-foreground mb-8">
              Your body measurement details have been submitted successfully. Our expert tailors will review your information and contact you with your personalized measurements.
            </p>
            <button onClick={() => { setSubmitted(false); setCurrentStep(1); }} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
              Submit Another Measurement
            </button>
          </motion.div>
        </section>
        <Footer />
      </>
    );
  }

  const { title: stepTitle} = stepInfo[currentStep - 1];

  return (
    <>
      <section className="relative h-[56vh] min-h-[420px] max-h-[620px] overflow-hidden bg-primary text-primary-foreground">
        <Navbar />
        <div className="absolute inset-0">
          <img
            src={heroMeasurement}
            alt="AI Body Measurement System"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/70" />
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pt-20 text-center">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div className="w-8 h-px bg-primary-foreground/60" />
              <p className="text-primary-foreground/80 font-sans tracking-[0.3em] text-xs uppercase">
                Measurement
              </p>
              <div className="w-8 h-px bg-primary-foreground/60" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-5xl md:text-5xl leading-[1.1] mb-8 text-primary-foreground"
            >
              AI Body Measurement System
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary-foreground/85 text-lg leading-relaxed"
            >
              Enter your details for accurate, bespoke tailoring measurements
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-card rounded-2xl shadow-lg p-8 md:p-12"
          >
            {/* Progress */}
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Step {currentStep} of {TOTAL_STEPS}
              </p>
            </div>

            {/* Step Header */}
            <div className="mb-8 border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <span className="text-primary text-lg font-bold">—</span>
                <h2 className="text-2xl md:text-3xl font-serif flex items-center gap-3 text-foreground">
                  <span className="text-2xl"> {stepTitle}</span>
                </h2>
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {currentStep === 1 && (
                  <>
                    <div>
                      <label className="text-foreground font-medium">Age *</label>
                      <input
                        ref={ageInputRef}
                        type="number"
                        placeholder="Enter your age"
                        value={formData.age}
                        onChange={(e) => updateField("age", e.target.value)}
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        min={10}
                        max={100}
                      />
                    </div>
                    <div>
                      <label className="text-foreground font-medium">Your Height *</label>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <input
                          ref={heightInputRef}
                          type="number"
                          placeholder="Height"
                          value={formData.height}
                          onChange={(e) => updateField("height", e.target.value)}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <select value={formData.heightUnit} onChange={(e) => updateField("heightUnit", e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="cm">Centimeters (cm)</option>
                          <option value="ft">Feet (ft)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-foreground font-medium">Your Weight *</label>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <input
                          ref={weightInputRef}
                          type="number"
                          placeholder="Weight"
                          value={formData.weight}
                          onChange={(e) => updateField("weight", e.target.value)}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <select value={formData.weightUnit} onChange={(e) => updateField("weightUnit", e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="kg">Kilograms (kg)</option>
                          <option value="lbs">Pounds (lbs)</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <div>
                      <label className="text-foreground font-medium">Fat Distribution *</label>
                      <select ref={fatDistributionSelectRef} value={formData.fatDistribution} onChange={(e) => updateField("fatDistribution", e.target.value)} className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Select fat distribution</option>
                        <option value="upper">Upper Body (Arms, Chest, Shoulders)</option>
                        <option value="midsection">Midsection (Belly, Waist)</option>
                        <option value="lower">Lower Body (Hips, Thighs, Legs)</option>
                        <option value="even">Evenly Distributed</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-foreground font-medium">Body Type *</label>
                      <select ref={bodyTypeSelectRef} value={formData.bodyType} onChange={(e) => updateField("bodyType", e.target.value)} className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Select body type</option>
                        <option value="slim">Slim</option>
                        <option value="average">Average</option>
                        <option value="athletic">Athletic</option>
                        <option value="curvy">Curvy</option>
                        <option value="plus">Plus Size</option>
                      </select>
                    </div>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <div>
                      <label className="text-foreground font-medium">Activity Level *</label>
                      <select ref={activityLevelSelectRef} value={formData.activityLevel} onChange={(e) => updateField("activityLevel", e.target.value)} className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Select activity level</option>
                        <option value="sedentary">Sedentary (Little or no exercise)</option>
                        <option value="light">Light (1-2 days/week)</option>
                        <option value="moderate">Moderate (3-5 days/week)</option>
                        <option value="active">Active (6-7 days/week)</option>
                        <option value="very-active">Very Active (Athlete level)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-foreground font-medium">Muscle Level *</label>
                      <select ref={muscleLevelSelectRef} value={formData.muscleLevel} onChange={(e) => updateField("muscleLevel", e.target.value)} className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Select muscle level</option>
                        <option value="low">Low (Minimal muscle)</option>
                        <option value="moderate">Moderate (Some visible muscle)</option>
                        <option value="high">High (Well-defined muscle)</option>
                        <option value="very-high">Very High (Bodybuilder level)</option>
                      </select>
                    </div>
                  </>
                )}

                {currentStep === 4 && (
                  <>
                    <div>
                      <label className="text-foreground font-medium">Measurement Goal *</label>
                      <select ref={measurementGoalSelectRef} value={formData.measurementGoal} onChange={(e) => updateField("measurementGoal", e.target.value)} className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Select measurement goal</option>
                        <option value="tailoring">Clothing / Tailoring</option>
                        <option value="fitness">Fitness Tracking</option>
                        <option value="health">Health Monitoring</option>
                        <option value="custom">Custom / Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-foreground font-medium">Fit Preference *</label>
                      <select ref={fitPreferenceSelectRef} value={formData.fitPreference} onChange={(e) => updateField("fitPreference", e.target.value)} className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Select fit preference</option>
                        <option value="slim">Slim Fit</option>
                        <option value="regular">Regular / Standard</option>
                        <option value="comfort">Comfort Fit</option>
                        <option value="loose">Loose Fit</option>
                      </select>
                    </div>
                  </>
                )}

                {currentStep === 5 && (
                  <>
                    <div>
                      <label className="text-foreground font-medium">Shoulder Type *</label>
                      <select ref={shoulderTypeSelectRef} value={formData.shoulderType} onChange={(e) => updateField("shoulderType", e.target.value)} className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Select shoulder type</option>
                        <option value="narrow">Narrow</option>
                        <option value="average">Average</option>
                        <option value="broad">Broad</option>
                        <option value="sloped">Sloped</option>
                      </select>
                    </div>
                  </>
                )}

                {currentStep === 6 && (
                  <div className="grid grid-cols-2 gap-6">
                    {/* Front View */}
                    <label ref={frontUploadRef} tabIndex={-1} className="cursor-pointer group">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload("front", e)}
                      />
                      <div className="border-2 border-dashed border-primary/40 rounded-xl p-6 text-center hover:border-primary hover:bg-primary/5 transition-all min-h-[200px] flex flex-col items-center justify-center gap-3">
                        {frontPreview ? (
                          <img src={frontPreview} alt="Front view" className="max-h-40 rounded-lg object-cover mx-auto" />
                        ) : (
                          <Upload className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                        <p className="font-medium text-foreground text-sm">Front View</p>
                        <p className="text-xs text-muted-foreground">Click to upload</p>
                        {formData.frontImage && (
                          <p className="text-xs text-primary truncate max-w-full">{formData.frontImage.name}</p>
                        )}
                      </div>
                    </label>

                    {/* Side View */}
                    <label ref={sideUploadRef} tabIndex={-1} className="cursor-pointer group">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload("side", e)}
                      />
                      <div className="border-2 border-dashed border-primary/40 rounded-xl p-6 text-center hover:border-primary hover:bg-primary/5 transition-all min-h-[200px] flex flex-col items-center justify-center gap-3">
                        {sidePreview ? (
                          <img src={sidePreview} alt="Side view" className="max-h-40 rounded-lg object-cover mx-auto" />
                        ) : (
                          <Upload className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                        <p className="font-medium text-foreground text-sm">Side View</p>
                        <p className="text-xs text-muted-foreground">Click to upload</p>
                        {formData.sideImage && (
                          <p className="text-xs text-primary truncate max-w-full">{formData.sideImage.name}</p>
                        )}
                      </div>
                    </label>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
              {currentStep > 1 ? (
                <button onClick={handlePrevious} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition">
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>
              ) : (
                <div />
              )}

              {currentStep < TOTAL_STEPS ? (
                <button onClick={handleNext} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2 transition">
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={handleSubmit} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2 transition">
                  Calculate Measurements <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Measurement;
