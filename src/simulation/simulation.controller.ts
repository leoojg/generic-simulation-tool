import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ExecuteSimulationDto } from './dtos/execute-simulation.dto';
import { SimulationService } from './simulation.service';

@Controller('simulation')
export class SimulationController {
    constructor(private readonly simulationService: SimulationService) {}
    @Get('/')
    get() {
        return this.simulationService.get();
    }

    @Post('/')
    execute(@Body() executeSimulation: ExecuteSimulationDto) {
        return this.simulationService.execute(executeSimulation);
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
