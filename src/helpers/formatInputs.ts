export function formatCNPJ(value: string) {
  return value
    .replace(/\D/g, "") // remove tudo que não for número
    .replace(/^(\d{2})(\d)/, "$1.$2") // coloca o primeiro ponto
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // coloca o segundo ponto
    .replace(/\.(\d{3})(\d)/, ".$1/$2") // coloca a barra
    .replace(/(\d{4})(\d)/, "$1-$2") // coloca o hífen
    .slice(0, 18); // limita ao tamanho do CNPJ formatado
}

// Função para formatar CEP
export function formatCEP(value: string) {
  return value
    .replace(/\D/g, "") // remove tudo que não for número
    .replace(/^(\d{5})(\d)/, "$1-$2") // coloca o hífen
    .slice(0, 9); // limita ao tamanho do CEP formatado
}
