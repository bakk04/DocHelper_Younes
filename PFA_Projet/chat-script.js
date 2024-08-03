class ChatBot {
  constructor() {
      this.chatbox = document.getElementById('chatbox');
      this.chatMessages = document.getElementById('chat-messages');
      this.userInput = document.getElementById('user-input');
      this.sendButton = document.getElementById('send-button');

      this.sendButton.addEventListener('click', () => this.sendMessage());
      this.setupSuggestions();

      this.illnessAdvice = {
         "fièvre": "Pour la fièvre : Buvez beaucoup d'eau, reposez-vous et prenez un antipyrétique si nécessaire. Consultez un médecin si la fièvre persiste plus de deux jours.",
"rhume": "Pour le rhume : Reposez-vous, buvez des liquides chauds et utilisez des décongestionnants. Consultez un médecin si les symptômes durent plus d'une semaine.",
"grippe": "Pour la grippe : Reposez-vous bien, buvez beaucoup de liquides et prenez des médicaments antiviraux si prescrits par un médecin. Consultez un médecin pour des conseils supplémentaires.",
"asthme": "Pour l'asthme : Utilisez votre inhalateur de secours si nécessaire, consultez un médecin si votre état s'aggrave.",
"bronchite chronique": "Pour la bronchite chronique : Arrêtez de fumer, buvez beaucoup de liquides, utilisez un humidificateur d'air.",
"emphysème": "Pour l'emphysème : Arrêtez de fumer, participez à un programme de réhabilitation pulmonaire, utilisez de l'oxygène supplémentaire si nécessaire.",
"pneumonie": "Pour la pneumonie : Reposez-vous, buvez beaucoup de liquides, prenez des antibiotiques si prescrits par un médecin, consultez un médecin si votre état s'aggrave.",
"hypertension artérielle": "Pour l'hypertension artérielle : Adoptez une alimentation saine, faites de l'exercice régulièrement, réduisez votre consommation de sel, prenez des médicaments si prescrits par un médecin.",
"maladie coronarienne": "Pour la maladie coronarienne : Arrêtez de fumer, contrôlez votre cholestérol et votre tension artérielle, faites de l'exercice régulièrement, prenez des médicaments si prescrits par un médecin.",
"accident vasculaire cérébral": "Pour un AVC : Appelez immédiatement les secours si vous pensez avoir un AVC, adoptez un mode de vie sain pour réduire votre risque d'AVC.",
"ulcère gastroduodénal": "Pour un ulcère gastroduodénal : Prenez des médicaments pour réduire l'acide gastrique, évitez les aliments irritants, mangez des repas réguliers.",
"maladie inflammatoire de l'intestin": "Pour la maladie inflammatoire de l'intestin : Prenez des médicaments pour réduire l'inflammation, suivez un régime alimentaire adapté, gérez votre stress.",
"diarrhée": "Pour la diarrhée : Buvez beaucoup de liquides pour éviter la déshydratation, mangez des aliments fades, consultez un médecin si la diarrhée persiste.",
"mal de tête": "Pour un mal de tête : Reposez-vous dans une pièce sombre et calme, appliquez une compresse froide sur la tête, prenez des analgésiques en vente libre.",
"migraine": "Pour la migraine : Évitez les déclencheurs de la migraine, prenez des médicaments contre la migraine si prescrits par un médecin, appliquez une compresse froide sur la tête.",
"épilepsie": "Pour l'épilepsie : Prenez vos médicaments anticonvulsifs selon les instructions, portez un bracelet d'identification médicale, évitez les déclencheurs de crises.",
"anxiété": "Pour l'anxiété : Faites de l'exercice régulièrement, pratiquez des techniques de relaxation, consultez un professionnel de la santé mentale si nécessaire.",
"dépression": "Pour la dépression : Consultez un professionnel de la santé mentale, envisagez une thérapie ou des médicaments, passez du temps avec vos proches.",
"trouble du stress post-traumatique": "Pour le trouble du stress post-traumatique : Consultez un professionnel de la santé mentale, envisagez une thérapie par EMDR ou une thérapie cognitivo-comportementale.",
"acné": "Pour l'acné : Lavez votre visage deux fois par jour, utilisez des produits non comédogènes, consultez un dermatologue si votre acné est sévère.",
"eczéma": "Pour l'eczéma : Hydratez votre peau régulièrement, évitez les irritants, utilisez des crèmes corticoïdes si prescrites par un médecin.",
"psoriasis": "Pour le psoriasis : Hydratez votre peau régulièrement, évitez les irritants, utilisez des crèmes ou traitements prescrits par un médecin.",
"bonjour" : "Bonjour ! : Comment puis-je vous aider aujourd'hui ?",
"dochelper" : "DocHelpRE est un assistant médical virtuel qui peut vous aider avec des conseils médicaux basiques.",
"younes" : "Younes est un étudiant en troisième année d'informatique et réseaux à l'École Marocaine des Sciences de l'Ingénieur, et il est le développeur de ce site.",
};
  }

  sendMessage() {
      const userMessage = this.userInput.value.trim();
      if (userMessage === '') return;

      this.appendUserMessage(userMessage);
      this.processUserMessage(userMessage);

      this.userInput.value = '';
      this.scrollToBottom();
  }

  appendBotMessage(message) {
      const botMessageElement = this.createMessageElement(message, 'bot-message');
      this.chatMessages.appendChild(botMessageElement);
      this.scrollToBottom();
  }

  appendUserMessage(message) {
      const userMessageElement = this.createMessageElement(message, 'user-message');
      this.chatMessages.appendChild(userMessageElement);
      this.scrollToBottom();
  }

  createMessageElement(message, messageType) {
      const messageElement = document.createElement('div');
      messageElement.classList.add(messageType);
      messageElement.innerHTML = `<p>${message}</p>`;
      return messageElement;
  }

  processUserMessage(message) {
      const correctedMessage = this.correctSpelling(message.toLowerCase());

      let adviceFound = false;
      for (const [illness, advice] of Object.entries(this.illnessAdvice)) {
          if (correctedMessage.includes(illness)) {
              this.appendBotMessage(advice);
              adviceFound = true;
              break;
          }
      }

      if (!adviceFound) {
          const botResponse = `Je suis désolé, je ne suis pas sûr de comprendre. Pouvez-vous fournir plus de détails sur vos symptômes ou votre question ?`;
          this.appendBotMessage(botResponse);
      }
  }

  correctSpelling(message) {
      const corrections = {
          "fievre": "fièvre",
          "rhume": "rhume",
          "grip": "grippe",
          "DocHelper": "dochelper",
          "Bonjour": "bonjour",
          "tete": "mal de tête",
          "Younes": "younes",
          "youness": "younes",
          // Ajoutez d'autres corrections orthographiques ici
      };

      let correctedMessage = message;

      // Remplacer les mots mal orthographiés par leurs corrections
      for (const [misspelledWord, correctWord] of Object.entries(corrections)) {
          correctedMessage = correctedMessage.replace(new RegExp(misspelledWord, 'g'), correctWord);
      }

      return correctedMessage;
  }

  scrollToBottom() {
      this.chatbox.scrollTop = this.chatbox.scrollHeight;
  }

  setupSuggestions() {
      const suggestionButtons = document.querySelectorAll('.suggestion-btn');
      suggestionButtons.forEach(button => {
          button.addEventListener('click', () => {
              const suggestion = button.textContent.trim();
              this.userInput.value = suggestion;
              this.sendMessage();
          });
      });
  }
}

// Initialisation du chatbot
const chatBot = new ChatBot();
