import {Pipe, PipeTransform} from "@angular/core";
import {OldQuote, QuoteStatus} from "../shared/asiquote/ASIQuote.model";
import {Enquiry} from "../shared/enquiry/enquiry.model";

@Pipe({
  name: 'quotesByStatus',
  pure: false
})
export class QuotesStatusPipe implements PipeTransform {
  transform(allEnquiriesAndQuotes: [Enquiry, OldQuote][], desiredStatuses: [QuoteStatus]) {
    console.log(`Filtering on statuses: ${JSON.stringify(desiredStatuses)}`);
    return allEnquiriesAndQuotes.filter(
      enquiryAndQuote => desiredStatuses.includes(enquiryAndQuote[1].quote_status));
  }
}
