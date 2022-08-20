import { Controller, Post } from '@nestjs/common';
import { SimulationService } from './simulation.service';

@Controller('simulation')
export class SimulationController {
    constructor(private readonly simulationService: SimulationService) {}
    @Post('/')
    execute() {
        return this.simulationService.execute();
    }
}
