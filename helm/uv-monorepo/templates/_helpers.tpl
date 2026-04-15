 {{/*
Common labels applied to all resources.
*/}}
{{- define "uv-monorepo.labels" -}}
app.kubernetes.io/managed-by: {{ .Release.Service }}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
{{- end -}}

{{/*
Selector labels for a specific component.
Takes a component name as context.
Usage: {{ include "uv-monorepo.selectorLabels" "api-1" }}
*/}}
{{- define "uv-monorepo.selectorLabels" -}}
app: {{ . }}
{{- end -}}
