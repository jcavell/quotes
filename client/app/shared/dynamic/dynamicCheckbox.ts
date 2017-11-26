import {DynamicInput} from "./dynamicInput";
export class DynamicCheckbox extends DynamicInput<string> {
  controlType = 'checkbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
