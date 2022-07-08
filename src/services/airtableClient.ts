import Airtable from 'airtable';
import { AirtableBase } from 'airtable/lib/airtable_base';

import { endPointAirTable } from 'services/apiEndpoint';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: endPointAirTable.auth.apiKey,
});

export default Airtable.base(endPointAirTable.auth.base) as AirtableBase;
