import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aboutme',
  imports: [FormsModule],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.css',
})
export class AboutmeComponent {
  showPreOutput = true;
  command = '';
  output = '';
  checkCommand(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const commandValue = this.command.trim();
      if (commandValue === 'help') {
        this.help();
      } else if (commandValue == 'clear') {
        this.clear();
      } else if (commandValue.startsWith('say')) {
        this.say(commandValue.substring(3));
      } else if (commandValue == 'time') {
        this.time();
      } else if (commandValue == 'about') {
        this.about();
      } else if (commandValue == 'contact') {
        this.contact();
      }
      this.command = '';
    }
  }

  help(): void {
    const commandsList = [
      'Help: List of available commands',
      '>help',
      '>about',
      '>contact',
      '>time',
      '>clear',
      '>say',
    ];
    let outputValue = '\r\n';
    for (var i = 0; i < commandsList.length; i++) {
      outputValue += commandsList[i] + '\r\n';
    }
    this.output += outputValue;
  }

  clear(): void {
    this.showPreOutput = false;
    this.output = '>clear';
  }

  say(text: string): void {
    this.output += '\r\n>[say]: ' + text;
  }

  time(): void {
    this.output += "\r\n>It's the 21st century man! Get a SmartWatch";
  }

  about(): void {
    const about = [
      '>About:',
      'Hi There!',
      "I'm Sasan Parviz, a skilled web developer and software engineer with expertise in creating efficient server-side solutions and dynamic front-end applications. As a master of frameworks like Angular and React, he leverages innovative technologies such as Postgres & MongoDB and Nest.js to deliver scalable and high-performance systems tailored to client needs.",
      'Fell free to follow me on instagram @sasan_parviz - more in contact command.',
    ];
    let outputValue = '\r\n';
    for (var i = 0; i < about.length; i++) {
      outputValue += about[i] + '\r\n';
    }
    this.output += outputValue;
  }

  contact(): void {
    var contactArray = [
      '>Contact:',
      '[GitHub](https://github.com/sasan-parviz/)',
      '[Telegram](https://telegram.me/sasan_parviz/)',
      '[linkedin](https://www.linkedin.com/in/sasan-parviz/)',
      '[StackOverflow](https://stackoverflow.com/users/5802050/mrsasan)',
    ];

    let outputValue = '\r\n';
    for (var i = 0; i < contactArray.length; i++) {
      outputValue += contactArray[i] + '\r\n';
    }
    this.output += outputValue;
  }
}
