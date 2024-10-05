export interface Template {
  name: string
  value: string
  npmName: string
  version: string
}

export interface SelectedTemplate {
  type: {
    name: string
    value: string
  } []
  name: string
  template: Template
  targetPath: string
}
