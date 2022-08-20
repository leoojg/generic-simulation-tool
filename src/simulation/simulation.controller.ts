import { Controller, Delete, Get, Post } from '@nestjs/common';
import { SimulationService } from './simulation.service';

@Controller('simulation')
export class SimulationController {
    constructor(private readonly simulationService: SimulationService) {}
    @Get('/')
    execute() {
        return this.simulationService.get();
    }

    @Post('/load-default')
    load() {
        return this.simulationService.load();
    }

    @Delete('/')
    clear() {
        return this.simulationService.clear();
    }
}
