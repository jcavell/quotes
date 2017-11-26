import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {DynamicInput} from "../shared/dynamic/dynamicInput";

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
  @Input() question: DynamicInput<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
}
