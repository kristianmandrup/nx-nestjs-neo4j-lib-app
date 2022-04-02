import { readFile } from './read-file';
import { configuration } from './configuration';

export const httpsConfig = {
  // private-key.pem
  key: readFile(configuration().httpsKeyFile),
  // public-certificate.pem
  cert: readFile(configuration().httpsCertFile),
};
