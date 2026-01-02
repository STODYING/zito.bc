// 간단한 상태 관리
import { User } from 'firebase/auth';
import { ZitoUser } from '../services/firebase';

interface AppState {
    user: User | null;
    userData: ZitoUser | null;
    isLoading: boolean;
    isLoggedIn: boolean;
}

type Listener = (state: AppState) => void;

class StateManager {
    private state: AppState = {
        user: null,
        userData: null,
        isLoading: true,
        isLoggedIn: false
    };
    
    private listeners: Listener[] = [];

    getState(): AppState {
        return { ...this.state };
    }

    setState(newState: Partial<AppState>): void {
        this.state = { ...this.state, ...newState };
        this.notify();
    }

    subscribe(listener: Listener): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notify(): void {
        this.listeners.forEach(listener => listener(this.state));
    }
}

export const appState = new StateManager();
