export class FiniteServerDto {
    available: boolean;
    leaveTime: number;
    cameIn: number;
    temporalEntityName?: string;
    availabilityChange?: Array<{ time: number; available: boolean }>;
}
