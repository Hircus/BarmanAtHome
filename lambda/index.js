//Icons made by <a href="https://flat-icons.com/" title="Flat Icons">Flat Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
const Alexa = require('ask-sdk-core');

const RECIPE_ADJECTIVES = [
    ". Ottima scelta. Lo servono nei migliori locali. ",
    ". Buona scelta. Sicuramente non rimarrai sobrio con questo. ",
    ". Bella scelta. Forte e ricco di gusto. ",
];

var choice ={
    base: undefined,
    drink: undefined,
    instructions: undefined,
    ingredients: undefined,
    variant: undefined,
};

var CHOSEN_BASE;
var istruzione = 0;

function random_from_array(array){
	return array[Math.floor(Math.random()*array.length)];
}

const recipes = {
    'gin': [
        {
            name: "dry martini",
            instructions: [
                "Per preparare il Dry Martini per prima cosa riempi il mixing glass con del ghiaccio. ",
                "Versa il gin e poi il vermouth dry direttamente nel mixing glass. ",
                "Mescola il tutto con il bar spoon. ",
                "Versa il contenuto del mixing glass nella coppa raffreddata in freezer. ",
		        "Accompagna il Martini con delle olive o delle scorze di limone. ",
		        "Complimenti, hai fatto un ottimo drink! Puoi chiedermi di ripetermi la ricetta, oppure puoi chiudere salutandomi. "
            ],
            ingredients: [
                "60 millilitri di gin",
                "10 millilitri di vermountdry",
                "scorza di limone",
                "olive verdi",
                "ghiaccio"
            ],
            variant: [
                "Certo! Se vuoi gustarti il Martini ma non gradisci il gin, potresti usare la vodka. <p>Il Martini Vodka è il cocktail preferito di James bond</p>"
            ]
        },
	 {
            name: "negroni",
            instructions: [
                "Per preparare il Negroni versa il bitter Campari nel bicchiere.",
                "Aggiungi poi il Vermouth rosso. ",
                "A questo punto versa il gin. ",
                "Il passo successivo è quello di aggiungere del ghiaccio. ",
		        "Poi mescola e guarnisci il tuo Negroni con una fetta di arancia. ",
                "Salute! Puoi chiedermi di ripetermi la ricetta, oppure puoi chiudere salutandomi. "
            ],
            ingredients: [
                "30 millilitri di gin",
                "30 millilitri di bitter Campari o Martini",
                "30 millilitri di Vermounth rosso  ",
                "una fetta di arancia",
                "ghiaccio"
            ],
            variant: [
                "Certo! Se vuoi variare dal gin puoi gustarti il negroni inserendo come base lo Spumante. <p>Questa variante viene detta Negroni Sbagliato</p>"
            ]
        },
    ],
    'vodka': [{
            name: "cosmopolitan",
            instructions: [
                "Per prima cosa, ancora prima di preparare il Cosmopolitan metti in freezer la coppetta nella quale servirai il vostro cocktail. ",
		        "In uno shaker versa il succo di lime e poi anche il succo di mirtillo rosso. ",
                "Procedi con la parte alcolica: cointreau e vodka. ",
                "Con l'aiuto di una pinza, aggiungi il ghiaccio a cubetti. ",
                "Inserisci tre cubetti di ghiaccio nel mixing tin (la campana più grande) dello shaker. ",
                "Chiudi le due parti dello shaker e agita in modo vigoroso. ",
 	            "Versa il tutto nel bicchiere, bloccando il ghiaccio con l'aiuto di uno strainer. ",
	            "Completa il vostro Cosmopolitan con una fettina di lime posto al centro del drink con l'aiuto di una pinza. ",
                "Alla Salute! Puoi chiedermi di ripetermi la ricetta, oppure puoi chiudere salutandomi. "
            ],
            ingredients: [
                "40 millilitri di vodka",
                "15 millilitri di cointreau (liquore francese)",
                "15 millilitri di succo di lime  ",
                "30 millilitri di succo di mirtillo rosso",
		        "un lime",
                "ghiaccio"
            ],
            variant: [
                "Certo! Se la vodka non fa per te prova a sostituirla con la tequila. <p>Questo drink è conosciuto come Rude Cosmopolitan</p>"
            ]
        },
        {
            name: "white russian",
            instructions: [
                "Per preparare il White Russian comincia versando direttamente nel bicchiere la vodka e poi il liquore al caffè. ",
                "Aggiungi dei cubetti di ghiaccio fino a riempimento del bicchiere, aiutandoti con una pinza per evitare contaminazioni. ",
                "Mescola gentilmente con un bar spoon, cucchiaio dal manico lungo utilizzato per miscelare i cocktail. ",
                "A questo punto semimonta la panna in uno shaker e versala come top del cocktail. ",
                "Completa il vostro White Russian con dei chicchi di caffè come guarnizione. ",
                "Buona serata! Puoi chiedermi di ripetermi la ricetta, oppure puoi chiudere salutandomi. "
            ],
            ingredients: [
                "vodka",
                "liquore al caffè",
                "panna fresca",
            ],
            variant: [
            ]
        },
    ],
    'whiskey': [
        {
            name: "manhattan",
            instructions: [
                "Per prima cosa riempi il tuo Mixing glass con del ghiaccio, così da raffreddare le pareti del bicchiere. ",
                "Versa nel mixing glass il rye whisky e a seguire il vermouth, misurando la quantità con un jigger.  ",
                "Aggiungi qualche goccia di angostura e con il bar spoon mescola il tutto. ",
                "Versa nella coppa raffreddata in freezer e completa il tuo Manhattan con una guarnizione a base di oli essenziali di arancia: ",
		        "Spremi una fetta di buccia d'arancia in modo da far uscire gli oli nel bicchiere ",
                "Passa la scorza sul bordo e sullo stelo della coppa per diffondere il profumo d'agrume. ",
		        "Termina il cocktail con una ciliegia al maraschino. ",
		        "Salute! Puoi chiedermi di ripetermi la ricetta, oppure puoi chiudere salutandomi. "
            ],
            ingredients: [
                "40 millilitri di rye whisky o Canadian whisky",
                "20 millilitri di vermouth rosso",
                "alcune gocce di Angostura",
                "della ciliegina al Maraschino",
                "della buccia di arancia fresca a piacere",
                "ghiaccio"

            ],
            variant: [
                "Certo! Se il Rye whiskey non fa per te, puoi scambiarlo col brandy. <p>Questa popolare variazione viene chimata Metropolitan</p>"
            ]
        },
        {
            name: "irish coffee",
            instructions: [
                "Per un buon Irish coffee la prima cosa da fare è pensare al caffè: quello che vi serve è un caffè filtrato, detto anche caffè all’americana. ",
        		"Preparalo versando dell'acqua bollente su una quantità di caffè macinato e pressato con l'apposita French press. ",
        		"Lascialo riposare in infusione per 12 ore. L'ideale è preparare il caffè un giorno prima. ",
                "Preriscalda poi il bicchiere in cui servirete il cocktail, versandovi dell’acqua calda che getterai via. ",
                "Inserisci lo zucchero di canna nel bicchiere di servizio, la dose giusta è quella di una bustina: circa 5 grammi. ",
        		"Versa il caffè filtrato caldo e miscelatelo con lo zucchero aiutandovi con un bar spoon, cucchiaio dal manico lungo utilizzato nella preparazione dei cocktail. ",
        		"A questo punto aggiungi al composto il whiskey. ",
                "Semimonta la panna per pochi secondi in uno shaker e adagiala delicatamente, con l’aiuto di un bar spoon, sulla superficie del composto. ",
        		"Non mescolare. Versa tutta la panna semimontata nel bicchiere. Spolvera con uno strato sottile di noce moscata e servi il cocktail. ",
        		"Il tuo irish coffee è pronto, complimenti! Puoi chiedermi di ripetermi la ricetta, oppure puoi chiudere salutandomi. "

            ],
            ingredients: [
                "5 grammi di zucchero di canna",
		        "90 millilitri di caffè ",
		        "40 millilitri di whisky",
		        "30 millilitri di panna fresca",
		        "noce moscata"

            ],
            variant: [
                "Certo! Il whiskey non è per tutti, se preferisci un tocco diverso prova il Cognac. <p>Il risultato sarà un ottimo French Coffee</p>"
            ]
        }
    ],
    'rum': [
        {
            name: "mojito",
            instructions: [
                "Comincia prendendo i due rametti di menta, spezzali con le mani e inseriscili nel bicchiere. ",
		        "Metti due cucchiai di zucchero di canna bianco nel bicchiere. ",
		        "A questo punto versa il succo di lime fresco. ",
                "Con l'aiuto di un bar spoon vivacizza la menta: stofinala sulle pareti del bicchiere in modo da far uscire gli oli essenziali di cui l'erba aromatica è ricca. ",
		        "Aggiungi la soda, il ghiaccio ed il rum bianco. ",
                "Mescola il tutto con il bar spoon, che richiama lo zucchero in alto. ",
		        "Guarnisci con un rametto di menta. ",
		        "Il tuo Mojito è pronto, salute! Puoi chiedermi di ripetermi la ricetta, oppure puoi chiudere salutandomi. "

            ],
            ingredients: [
                "Due cucchiai di zucchero di canna",
                "quarantacinque millilitri di rum",
                "venti millilitri di succo di lime fresco",
                "quaranta millilitri di soda",
                "due rametti di menta fresca",
                "ghiaccio"
            ],
            variant: [
                "Certo! Per un tocco più italiano ti consiglio di scambiare il Rum con il Branca Menta. <p>Questo cocktail tutto italiano viene chiamato Mojitaly</p>"
            ]
        },
        {
            name: "cuba libre",
            instructions: [
                "Si parte versando il rum bianco direttamente nel tumbler alto. Poi riempi il bicchiere di ghiaccio. ",
                "Versa la Cola fino a riempimento del bicchiere, in gergo si dice top di Cola. ",
		        "Spremi uno spicchio di <lang xml:lang='en-US'> lime </lang> e lasciatelo cadere nel bicchiere, questa procedura si chiama <lang xml:lang='en-US'>squeeze and drop</lang> . ",
                "Il Cuba libre è pronto. Bevetelo ben freddo. Puoi chiedermi di ripetermi la ricetta, oppure puoi chiudere salutandomi. "
            ],
            ingredients: [
                "quarantacinque millilitri di rum ",
                "un <lang xml:lang='en-US'>lime</lang>",
                "coca cola",
                "ghiaccio"
            ],
            variant: [
            ]
        }
    ]
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = "Benvenuto in Barman at Home! <p>Ho a disposizione un sacco di drink a base di rum, gin, whiskey o vodka. Quale preferisci?</p>";
        const speekReprompt = 'Mi dispiace, ho a disposizione solo rum, gin, whiskey e vodka. Ripetimi quale preferisci?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speekReprompt)
            .getResponse();
    }
};
const BaseChoiceIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'BaseChoiceIntent';
    },
    handle(handlerInput) {
        var speechText = 'Mi dispiace, non credo di aver capito. Potresti ripetere o usare un sinonimo?';
        const alcolico = handlerInput.requestEnvelope.request.intent.slots.Alcolico.value;
        const command = handlerInput.requestEnvelope.request.intent.slots.Comando.value;
        istruzione = 0;
        
        for(let k in recipes){
            if(k === alcolico){
                speechText='Hai scelto un cocktail a base di ' + alcolico + ', secondo me ti potrebbero piacere:';
                var base_ricetta = recipes[k];
	            CHOSEN_BASE = base_ricetta;
	            choice.base = alcolico;
	            for (let i in base_ricetta){
    	            let ricetta = base_ricetta[i];
    	            if(base_ricetta.length === 1){
    	                speechText='Hai scelto un cocktail a base di ' + alcolico + ', secondo me ti potrebbe piacere: ' + ricetta.name + '.';
    	            }
    	            else speechText += ' ' + ricetta.name + ', ';
	            }
            }
        }
        if(base_ricetta.length !== 1) speechText+=' quale scegli?';    

        
        
        return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
    }
};

const DrinkChoiceIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'DrinkChoiceIntent';
    },
    handle(handlerInput) {
        var speechText = 'Mi dispiace, non credo di aver capito. Potresti ripetere o usare un sinonimo?';
        const chosen_drink = handlerInput.requestEnvelope.request.intent.slots.Drink.value;
        const confirmation = handlerInput.requestEnvelope.request.intent.slots.Confirmation.value;
        const attributesManager = handlerInput.attributesManager;
        var ingredients;
        
        if(confirmation===undefined){ // l'utente non ha ancora dato conferma
            speechText= 'Questo drink: ' + chosen_drink + ', non ho idea di come farlo. Magari con il prossimo aggiornamento!';
            if(chosen_drink !== undefined || choice.drink !== undefined){
                for (let i in CHOSEN_BASE){
                    let ricetta = CHOSEN_BASE[i];
                    if(ricetta.name === chosen_drink){
                        choice.drink = chosen_drink;
                        choice.ingredients = ricetta.ingredients;
                        choice.instructions = ricetta.instructions;
                        choice.variant = ricetta.variant;
                        speechText = 'Hai scelto ' + chosen_drink + random_from_array(RECIPE_ADJECTIVES) + 'Vuoi sentire gli ingredienti?';
                    }
                }
            }
        }
        else if(confirmation!==undefined) { //l'utente ha definito una scelta
            if(confirmation==='va bene' || confirmation==='si' || confirmation === 'sì' || confirmation === 'eja'){
                speechText = 'Gli ingredienti sono: ';
                //choice.ingredients.forEach(item => speechText+= ", " + item + " ");
                for(let i in choice.ingredients){
                    if(i==='0') speechText += " " + choice.ingredients[i];
                    else speechText+= ", " + choice.ingredients[i];
                }
                speechText += '. Vuoi che ti ripeta gli ingredienti o posso iniziare? ';
            }
        }
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const DrinkInstructionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DrinkInstructionIntent';
    },
    handle(handlerInput) {
        var speechText = 'Mi dispiace, non credo di aver capito. Potresti ripetere o usare un sinonimo?';
        var command = handlerInput.requestEnvelope.request.intent.slots.Istruzioni.value;
        var comm_ingr = handlerInput.requestEnvelope.request.intent.slots.Ripeti.value;
        if(command !== undefined ){
            if(command === 'puoi iniziare' || command === 'iniziamo ora' || command === 'iniziamo la preparazione' || command === 'iniziamo'){
                speechText = 'Ora comincerò a ripeterti passo per passo cosa devi fare. Se vuoi iniziare puoi dire avanti. <break time="0.5s"/>';
                speechText += 'Dopo ogni passo, per sentire la prossima istruzione <break time="0.8s"/> avanti <break time="0.8s"/>, per ripetere <break time="0.8s"/> ' +
                'ripeti <break time="0.8s"/> o per il passaggio precedente <break time="0.8s"/> ripeti il passaggio precedente<break time="0.8s"/>. '
            }else{
                if(istruzione < choice.instructions.length -1){ 
                    if(command !== 'ripeti il passo precedente' && command !== 'ripeti l\'istruzione precedente' && command !== 'ripeti il passaggio precedente'){
                        speechText = choice.instructions[istruzione];
                        istruzione++;
                    }else if (istruzione > 1){
                        speechText = choice.instructions[istruzione-2];
                    }
                }
                else{
                    speechText = choice.instructions[istruzione];
                    istruzione = 0;
                }
                command = undefined;
            }
        }else if(comm_ingr !== undefined){
            speechText = 'Gli ingredienti sono: ';
            for(let i in choice.ingredients){
                if(i==='0') speechText += " " + choice.ingredients[i];
                else speechText+= ", " + choice.ingredients[i];
            }
            speechText += '. Vuoi che ti ripeta gli ingredienti o andiamo avanti?';
        }
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sono qui per aiutarti';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const HelpMeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelpMeIntent';
    },
    handle(handlerInput) {
        var speechText = 'Di cosa hai bisogno?';
        const aiuto = handlerInput.requestEnvelope.request.intent.slots.Argomento.value;
        const cambio = handlerInput.requestEnvelope.request.intent.slots.Cambia.value;
        const base = handlerInput.requestEnvelope.request.intent.slots.Base.value;
        
        
        if(choice.drink !== undefined){
            if(cambio !== undefined){
                if(choice.variant.length !== 0){
                    speechText = choice.variant[0];
                }else{
                    speechText = 'Mi dispiace, purtroppo non credo che con questo drink, il ' + choice.drink + ', sia possibile usando un\'altra base. <p>Ti assicuro che sarà buonissimo comunque. Vuoi sentire gli ingredienti?</p>';
                }
            }
        }else{
            speechText = 'Non hai scelto nessun drink ancora, prova a dirmi una base tra whiskey, rum, gin e vodka.'
        }
        
        
        switch (aiuto){
            case 'base':
            case 'scegliere la base':
            case 'scelta della base':
                speechText = 'Mi occorre solo che tu dica un alcolico che ti piaccia tra quelli proposti ed io penserò a darti le idee. <break time="1s"/> Per esempio dimmi: scelgo il whiskey';
                break;
            case 'drink':
            case 'bevanda':
            case 'bevande':
            case 'scegliere i drink':
            case 'scelta dei drink':
                speechText = 'Abbiamo una vasta scelta di drink, mi occorre che tu mi dica una base da cui partire tra quelle proposte. <break time="1s"/> Per esempio potresti chiedermi: scelgo la vodka <break time="0.5s"/> e poi <break time="0.5s"/> prepara un Cosmopolitan';
                break;
            case 'preparazione':
            case 'istruzioni':
                speechText = 'Una volta che hai scelto un drink, puoi dirmi <break time="0.5s"/> puoi iniziare <break time="0.5s"/> e ti verranno date le istruzioni passo per passo. ';
                speechText += 'Per procedere con la prossima istruzione puoi dirmi <break time="0.5s"/>avanti<break time="0.5s"/> oppure <break time="0.5s"/>continua<break time="0.5s"/>. ';
                speechText += 'Attenzione perché non si può tornare indietro. Ti consiglio di finire il procedimento corrente prima di continuare, ma se ti serve che io ripeta, basta chiedermi <break time="0.5s"/>ripeti<break time="0.5s"/>.'
                break;
                
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Ciao! Recensiscimi con 5 stelle mi raccomando!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Hai chiamato ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Mi dispiace, non credo di aver capito. Potresti ripetere o usare un sinonimo?`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        BaseChoiceIntentHandler,
        DrinkChoiceIntentHandler,
        DrinkInstructionIntentHandler,
        HelpMeIntentHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
