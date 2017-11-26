import {Injectable} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicInput} from "./dynamicInput";

@Injectable()
export class DynamicInputControlService {
  constructor() { }

  toFormGroup(questions: DynamicInput<any>[] ) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
