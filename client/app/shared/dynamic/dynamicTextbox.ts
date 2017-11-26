import {DynamicInput} from "./dynamicInput";
export class DynamicTextbox extends DynamicInput<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
