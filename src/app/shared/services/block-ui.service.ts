import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BlockUIService {

    private behaviorSubject = new BehaviorSubject<boolean>(false);
    public isBlocked = this.behaviorSubject.asObservable();

    block() {
        this.behaviorSubject.next(true);
    }

    unblock() {
        this.behaviorSubject.next(false);
    }
}
