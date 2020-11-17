/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');

let app = {
    init () {
        const url = new URL('http://localhost:3000/.well-known/mercure');
        url.searchParams.append('topic', 'http://127.0.0.1:8000/messages');

        document.addEventListener('submit', app.sendMessage)

        const eventSource = new EventSource(url);
        eventSource.onmessage = event => {

            let data = JSON.parse(event.data);
            // Will be called every time an update is published by the server
            let message = document.createElement('div');
            let h4 = document.createElement('h4');
            let user = document.createTextNode(data.user);
            
            h4.appendChild(user);

            let p = document.createElement('p');
            p.classList.add('message-content')
            let content = document.createTextNode(data.content);
            p.appendChild(content);

            message.classList.add("message");

            message.appendChild(h4);
            message.appendChild(p);
            
            document.querySelector('.messages-list').appendChild(message)

            $('.messages-list').scrollTop($('.messages-list')[0].scrollHeight);

            var audio = new Audio('assets/musics/notif.wav');
            audio.play();
        }
    },
    sendMessage (evt) {
        evt.preventDefault();

        let data = document.querySelector('#message');

        if(data.value.length > 0){
            evt.target[1].setAttribute('disabled', 'disabled');
            $.ajax(
                {
                    url: 'http://127.0.0.1:8000/new/message', // URL sur laquelle faire l'appel Ajax
                    method: 'POST', // La méthode HTTP souhaité pour l'appel Ajax (GET ou POST)
                    dataType: 'html', // Le type de données attendu en réponse (text, html, xml, json)
                    data: {
                        'message': data.value
                    }
                }
            ).done(function(response) { // J'attache une fonction anonyme à l'évènement "Appel ajax fini avec succès" et je récupère le code de réponse en paramètre
                console.log(response); // debug
                
                $('#content').html(response);
                data.value = "";

                evt.target[1].removeAttribute('disabled');
    
                // TODO faire les actions souhaitées après la récupération de la réponse
            }).fail(function() { // J'attache une fonction anonyme à l'évènement "Appel ajax fini avec erreur"
                alert('Réponse ajax incorrecte');
            });
        }else{
            alert('Tu ne peux pas envoyer de message vide.');
        }
    }
}

document.addEventListener('DOMContentLoaded', app.init);
