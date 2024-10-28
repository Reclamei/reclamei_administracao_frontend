import {Component, Input, ViewChild} from '@angular/core';
import {ReclamationModel} from '../../models/aplicacao/reclamation.model';
import {EmailComponent} from '../email/email.component';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent {
    @Input() reclamations: ReclamationModel[] = [];
    @Input() showRating = false;

    @ViewChild(EmailComponent) emailComponent: EmailComponent;
    @ViewChild(MapComponent) mapComponent!: MapComponent;

    public mapsUrl = '';
    public mapVisible = false;
    public mapCentering: google.maps.LatLngLiteral = {lat: -19.551675, lng: -40.580482};
    public zoomMap = 15;
    public mapConfig: google.maps.MapOptions = this.initializeMapConfig();
    public mapType: google.maps.MapTypeId = google.maps.MapTypeId.ROADMAP;

    public showLocation(reclamation: ReclamationModel): void {
        this.mapCentering = {
            lat: Number(reclamation.localization.latitude),
            lng: Number(reclamation.localization.longitude)
        };
        this.zoomMap = 15;
        this.mapVisible = true;
    }

    async sendEmail() {
        try {
            const position = await this.getOrigin();
            const origin = `${position.latitude},${position.longitude}`;
            if (!origin) {
                return;
            }
            const destination = `${this.mapCentering.lat},${this.mapCentering.lng}`;
            this.mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
            await this.emailComponent.sendEmail(this.mapsUrl);
        } catch (error) {
            console.error('Erro ao obter localização:', error);
        }
    }

    private async getOrigin(): Promise<{ latitude: number; longitude: number }> {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    },
                    (error) => {
                        reject(error);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    }
                );
            } else {
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        });
    }

    private initializeMapConfig(): google.maps.MapOptions {
        return {
            streetViewControl: false,
            mapTypeControl: false,
            clickableIcons: true
        };
    }
}
