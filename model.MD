
```json
{
  "entidades": [
    "abrir_jogo",
    "procurar_partida",
    "aguardar_servidor",
    "jogar_partida",
    "finalizar_partida",
    "encerrar_jogo",
  ],
  "relacionamentos": [
    { "abrir_jogo": "procurar_partida" },
    { "abrir_jogo": "encerrar_jogo" },
    { "procurar_partida": "aguardar_servidor" },
    { "aguardar_servidor": "jogar_partida" },
    { "jogar_partida": "finalizar_partida" },
    { "finalizar_partida": "procurar_partida" },
    { "finalizar_partida": "encerrar_jogo" }
  ],
  "tempo_simulacao": 60000
}
```