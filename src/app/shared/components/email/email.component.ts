import {Component} from '@angular/core';
import emailjs from 'emailjs-com';
import {environment} from 'src/environments/environment';

import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-email',
    template: '',
})
export class EmailComponent {

    constructor(private authService: AuthService) {
    }

    async sendEmail(mapsUrl: string) {
        const user = await this.authService.getCurrentUser();
        const templateParams = {
            to_email: user.email,
            mapsUrl,
        };

        emailjs.send(environment.emailServiceId, environment.emailTemplateId, templateParams, environment.emailPrivateKey)
            .then((response) => {
                console.log('Email enviado com sucesso!', response.status, response.text);
            }, (error) => {
                console.error('Erro ao enviar email:', error);
            });
    }
}