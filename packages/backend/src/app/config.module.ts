import { ConfigModule } from '@nestjs/config';
import { configuration } from '../common/config';

// config module
export const configModule = ConfigModule.forRoot({
        isGlobal: true,
        ignoreEnvVars: true,
        load: [configuration],
        // envFilePath: '.development.env',
      })