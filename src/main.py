from flask import Flask, request, jsonify, send_from_directory
import requests

app = Flask(__name__, static_folder='static')

# Página inicial — carrega index.html
@app.route('/')
def home():
    return send_from_directory('static', 'index.html')

# Rota de chat com integração completa ao n8n
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    print(f"[DEBUG] Mensagem recebida: {user_message}")
    
    try:
        # URL do webhook do n8n - SUBSTITUA PELO SEU WEBHOOK CORRETO
        n8n_webhook_url = "https://zeltta-n8n-webhook.p1vldy.easypanel.host/webhook/0635cf4f-9792-407c-b22f-81e9a1124950"
        
        print(f"[DEBUG] Tentando conectar ao n8n: {n8n_webhook_url}" )
        
        # Enviar a mensagem para o n8n
        response = requests.post(
            n8n_webhook_url,
            json={"message": user_message},
            timeout=15
        )
        
        print(f"[DEBUG] Resposta do n8n - Status: {response.status_code}")
        print(f"[DEBUG] Conteúdo da resposta: {response.text}")
        
        if response.status_code == 200:
            try:
                n8n_response = response.json()
                print(f"[DEBUG] JSON da resposta: {n8n_response}")
                
                # Verificar se a resposta contém 'message' ou 'reply'
                if 'message' in n8n_response:
                    return jsonify({
                        "status": "success",
                        "message": n8n_response['message']
                    })
                elif 'reply' in n8n_response:
                    return jsonify({
                        "status": "success",
                        "message": n8n_response['reply']
                    })
                else:
                    # Tentar pegar a primeira chave existente (se houver)
                    if isinstance(n8n_response, dict) and len(n8n_response) > 0:
                        first_key = list(n8n_response.keys())[0]
                        return jsonify({
                            "status": "success",
                            "message": str(n8n_response[first_key])
                        })
                    elif isinstance(n8n_response, str):
                        return jsonify({
                            "status": "success",
                            "message": n8n_response
                        })
                    else:
                        return jsonify({
                            "status": "error",
                            "message": "Resposta do n8n não reconhecida."
                        })
            except Exception as e:
                print(f"[DEBUG] Erro ao processar JSON: {str(e)}")
                return jsonify({
                    "status": "error",
                    "message": "Erro ao interpretar a resposta do n8n."
                })
        else:
            print(f"[DEBUG] Erro HTTP: {response.status_code}")
            return jsonify({
                "status": "error",
                "message": "Erro ao se comunicar com o n8n."
            })
    except Exception as e:
        print(f"[DEBUG] Exceção: {str(e)}")
        return jsonify({
            "status": "error",
            "message": "Erro interno no servidor ao processar a mensagem."
        })

# Executar o servidor
if __name__ == '__main__':
    app.run(debug=True)
