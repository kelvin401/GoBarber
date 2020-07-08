interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseTemplateEmailDTO {
  template: string;
  variables: ITemplateVariables;
}
