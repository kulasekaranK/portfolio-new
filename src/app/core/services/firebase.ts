import { inject, Injectable, computed, signal, Signal } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  deleteDoc,
  updateDoc
} from '@angular/fire/firestore';
import { Project } from '../../data/modals/project.model';
import { ContactMessage } from '../../data/modals/contact.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private firestore = inject(Firestore);

  // 🔸 signal-based project list
projects: Signal<Project[]> = toSignal(
  collectionData(collection(this.firestore, 'projects'), { idField: 'id' }) as Observable<Project[]>,
  { initialValue: [] }
);


  // 🔸 get single project as signal
  getProjectSignal(id: string) {
    return toSignal(
      docData(doc(this.firestore, `projects/${id}`), { idField: 'id' }) as any,
      { initialValue: null }
    );
  }

  async addProject(project: Project) {
    const ref = collection(this.firestore, 'projects');
    return await addDoc(ref, project);
  }

  async updateProject(id: string, project: Partial<Project>) {
    const ref = doc(this.firestore, `projects/${id}`);
    return await updateDoc(ref, project);
  }

  async deleteProject(id: string) {
    const ref = doc(this.firestore, `projects/${id}`);
    return await deleteDoc(ref);
  }

  async submitContact(message: ContactMessage) {
    const ref = collection(this.firestore, 'contacts');
    return await addDoc(ref, { ...message, createdAt: new Date() });
  }
}
