import axiosInstance from "./axios";

export type MeasurementGender = "male" | "female";
export type MeasurementHeightUnit = "cm" | "m";
export type MeasurementWeightUnit = "kg" | "lbs";
export type MeasurementAgeGroup = "teen" | "adult" | "middle_age" | "senior";
export type MeasurementFatDistribution = "upper" | "middle" | "lower" | "even";
export type MeasurementMaleBodyType = "slim" | "avg" | "athletic" | "heavy";
export type MeasurementFemaleBodyType = "slim" | "avg" | "curvy" | "heavy";
export type MeasurementBodyType =
  | MeasurementMaleBodyType
  | MeasurementFemaleBodyType;
export type MeasurementActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";
export type MeasurementMuscleLevel = "low" | "moderate" | "high" | "very_high";
export type MeasurementShoulderType =
  | "narrow"
  | "average"
  | "broad"
  | "very_broad";
export type MeasurementGoal = "clothing" | "fitness" | "health" | "general";
export type MeasurementFitPreference =
  | "tight"
  | "regular"
  | "loose"
  | "oversized";

export interface ProcessMeasurementRequest {
  gender: MeasurementGender;
  age: number;
  height: number;
  heightUnit: MeasurementHeightUnit;
  weight: number;
  weightUnit: MeasurementWeightUnit;
  ageGroup?: MeasurementAgeGroup;
  fatDistribution?: MeasurementFatDistribution;
  bodyType?: MeasurementBodyType;
  activityLevel?: MeasurementActivityLevel;
  muscleLevel?: MeasurementMuscleLevel;
  shoulderType?: MeasurementShoulderType;
  measurementGoal?: MeasurementGoal;
  fitPreference?: MeasurementFitPreference;
  frontImage: File;
  sideImage: File;
}

export interface MeasurementSizeValue {
  cm: number;
  inches: number;
}

export interface MeasurementWeightValue {
  kg: number;
  lbs: number;
}

export interface MeasurementMetadata {
  bmi: number;
  bmi_category: string;
  body_type: string;
  body_type_input?: string;
  recommended_size: string;
  height: MeasurementSizeValue;
  weight: MeasurementWeightValue;
}

export interface ProcessMeasurementData {
  metadata: MeasurementMetadata;
  neck?: { circumference: MeasurementSizeValue };
  chest?: { circumference: MeasurementSizeValue };
  waist?: { circumference: MeasurementSizeValue };
  hip?: { circumference: MeasurementSizeValue };
  shoulder?: { width: MeasurementSizeValue };
  arm?: {
    hand_to_elbow: MeasurementSizeValue;
    shoulder_to_elbow: MeasurementSizeValue;
    total_length: MeasurementSizeValue;
  };
  armhole?: { circumference: MeasurementSizeValue };
  upper_thigh?: { circumference: MeasurementSizeValue };
  knee?: { circumference: MeasurementSizeValue };
  body_length?: { length: MeasurementSizeValue };
  upper_chest?: { circumference: MeasurementSizeValue };
  lower_chest?: { circumference: MeasurementSizeValue };
}

export interface MeasurementPoseValidationDetails {
  front_accepted: boolean;
  front_angle: number;
  front_message: string;
  side_accepted: boolean;
  side_angle: number;
  side_message: string;
  errors: string[];
}

export interface ProcessMeasurementSuccessResponse {
  success: true;
  measurements: ProcessMeasurementData;
}

export interface ProcessMeasurementErrorResponse {
  success: false;
  error: string;
  validation_details?: MeasurementPoseValidationDetails;
}

export type ProcessMeasurementResponse =
  | ProcessMeasurementSuccessResponse
  | ProcessMeasurementErrorResponse;

const MEASUREMENT_PROCESS_URL =
  import.meta.env.VITE_MEASUREMENT_PROCESS_URL || "http://213.210.21.155:5000/process";

const appendOptional = (formData: FormData, key: string, value?: string) => {
  if (value) {
    formData.append(key, value);
  }
};

export const measurementApi = {
  processMeasurements: async (
    payload: ProcessMeasurementRequest
  ): Promise<ProcessMeasurementResponse> => {
    const formData = new FormData();

    formData.append("gender", payload.gender);
    formData.append("age", String(payload.age));
    formData.append("height", String(payload.height));
    formData.append("height_unit", payload.heightUnit);
    formData.append("weight", String(payload.weight));
    formData.append("weight_unit", payload.weightUnit);
    appendOptional(formData, "age_group", payload.ageGroup);
    appendOptional(formData, "fat_distribution", payload.fatDistribution);
    appendOptional(formData, "body_type", payload.bodyType);
    appendOptional(formData, "activity_level", payload.activityLevel);
    appendOptional(formData, "muscle_level", payload.muscleLevel);
    appendOptional(formData, "shoulder_type", payload.shoulderType);
    appendOptional(formData, "measurement_goal", payload.measurementGoal);
    appendOptional(formData, "fit_preference", payload.fitPreference);
    formData.append("front_image", payload.frontImage);
    formData.append("side_image", payload.sideImage);

    const response = await axiosInstance.post<ProcessMeasurementResponse>(
      MEASUREMENT_PROCESS_URL,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // Measurement inference can take ~90s; override global 15s timeout.
        timeout: 120_000,
      }
    );

    return response.data;
  },
};

export default measurementApi;
