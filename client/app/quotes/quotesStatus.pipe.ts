import {Pipe, PipeTransform} from "@angular/core";
import {Quote, QuoteStatus} from "../shared/quote/quote.model";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";

@Pipe({
  name: 'quotesByStatus',
  pure: false
})
export class QuotesStatusPipe implements PipeTransform {
  transform(allQuoteRequestsAndQuotes: [QuoteRequest, Quote][], desiredStatuses: [QuoteStatus]) {
    console.log(`Filtering on statuses: ${JSON.stringify(desiredStatuses)}`);
    return allQuoteRequestsAndQuotes.filter(
      quoteRequestAndQuote => desiredStatuses.includes(quoteRequestAndQuote[1].quote_status));
  }
}
