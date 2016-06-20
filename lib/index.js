import { Activity, singleS3StreamOutput } from 'aries-data';
import rp from 'request-promise';

/**
 * Activity to run a query on Lister.io.
 */

const baseURI = 'http://api.lister.io/'