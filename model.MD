
```json
{
  "entidades": [
    "AJ",
    "PP",
    "AS",
    "JP",
    "FP",
    "EJ",
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


AJ-PP
AJ-EJ
AJ;0,9-PP;0,1-EJ
PP;1;1:1-180;AS
AS;1;1:1-60;JP
JP;1;1:180-360;FP;
FP;0,4-PP;0,6-EJ;
TS=60000
