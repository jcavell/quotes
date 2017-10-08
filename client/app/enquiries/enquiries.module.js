"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_module_1 = require("../shared/shared.module");
var enquiry_service_1 = require("../shared/enquiry/enquiry.service");
var enquiries_component_1 = require("./enquiries.component");
var enquiries_routing_module_1 = require("./enquiries-routing.module");
var selectedEnquiry_component_1 = require("./selectedEnquiry.component");
var selectedEnquiry_service_1 = require("../shared/enquiry/selectedEnquiry.service");
var quoteDocument_module_1 = require("../quote-document/quoteDocument.module");
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var asisearch_component_1 = require("./asisearch.component");
var EnquiriesModule = (function () {
    function EnquiriesModule() {
    }
    return EnquiriesModule;
}());
EnquiriesModule = __decorate([
    core_1.NgModule({
        imports: [
            enquiries_routing_module_1.EnquiriesRoutingModule,
            quoteDocument_module_1.QuoteDocumentModule,
            shared_module_1.SharedModule,
            angular2_modal_1.ModalModule.forRoot(),
            bootstrap_1.BootstrapModalModule
        ],
        declarations: [enquiries_component_1.EnquiriesComponent, selectedEnquiry_component_1.SelectedEnquiryComponent, asisearch_component_1.ASISearchModalComponent],
        exports: [enquiries_component_1.EnquiriesComponent, selectedEnquiry_component_1.SelectedEnquiryComponent],
        providers: [enquiry_service_1.EnquiryService, selectedEnquiry_service_1.SelectedEnquiryService],
        entryComponents: [asisearch_component_1.ASISearchModalComponent]
    })
], EnquiriesModule);
exports.EnquiriesModule = EnquiriesModule;
