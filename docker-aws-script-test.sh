 #!/bin/bash

docker build -t movie_app . 


docker run -e AWS_ACCESS_KEY_ID="ASIA5DYSEEJ4WJDVIWQP" -e AWS_SECRET_ACCESS_KEY="eOzW6R0nTepQ1j4fk+9RBm56fsamHAvfoS/bwQwU" -e AWS_SESSION_TOKEN="IQoJb3JpZ2luX2VjEML//////////wEaDmFwLXNvdXRoZWFzdC0yIkcwRQIgOTpti+gMA9MW1eDfGCBreE5G5SSWjHVJrMbMq2uOLf8CIQD82tu5svJC2JUx1Yz3QhWj13QW/04JLhCMxvJKBSqb3yqwAwhrEAIaDDkwMTQ0NDI4MDk1MyIMd9dANFl4aQk8grSlKo0Dz0LQVzpaB9hx0pg31PK3AqW0rucAa+1Poon82RP7z0cPHF18TVTqsjfVwA4zO/Sas1W3dnae51BiCT6jxYH0EnhWfZiKpFGEIUpwthRL915fFSPOz4/pe5GEJKzb9Jo5ndMTn8tknH2PtW5qcGDy5zqk9KbFqhcBCoHyptY1BARMxjMOgZ4ddTWQB6vfBkDSlnIq3BktGwCzFheBXdi+Xkv/Xd61jfODyYDdpmzny/e6ufzlsQJIiKaLCQcyUI64mCSi7VjKteL60s9AIr7+dwmRKx9dAqnMPCMoTUAg423xqAVjPJfP5qXk0nil+pvf4vUVj8Up5OPMrSJvUpG/u8fA23O146aE/5mbIAPheFAG0Fw1jCao4Jgi7yHHgbZsOT/xGiYq81RE7SaZikvTxBmwetMF7W99CE424SBr+sTkK+8SkawxOh54ba4Hq8VC5a3efgl+qLG412kWep/RrrqW6SmUq7IiICaB5lqsfsSiZYrK0ujsYP3/jNE9Tuzcglvrh/9ynxmH4pDNszCc26mZBjqmAar1izOGLuocUUkLLUlwQ4uQTIHhR2kdQpo9apJXxsevoA2KtHSHZFxoyIRhRVFEsWM4ImAn8TpQDrpVmBEo6oyhpnDuVW1gKQepVCmCq5FVU//PyiM6ZDJZIC06m5PhjDKUIRlIZvWZCjfjBstZstc+vBYyY/xEg9D6D+CSyu3GHJwvB4wPx6eUtf3/jasChbJW7n3hYIGVi9sopZeCxmAhqliUQ/M=" -e TMDB_API_KEY="bbd65721f7d2491fab3bc98e879ff7d7" -e STREAMING_API_KEY="5fed322583mshdcc4db1da5e3881p1b28a8jsnd6ef45eb4f96" -p 80:3000 movie_app

