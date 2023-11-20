import { Injectable } from "@angular/core";
import { TaskRepository } from "../core/tasks/interfaces/task.repository";
import { Task } from "../core/tasks/entities/task";
import { HttpClient } from "@angular/common/http";
import { TokenInterceptorService } from "src/app/infrastructure/token-interceptor.service"

const API_URL ='https://api.trello.com/1/';
const ID_LIST ='654033af419445cea8d64af7';

@Injectable({ providedIn: 'root' })
export class TaskTrelloService implements TaskRepository {

  constructor(private http: HttpClient) {}
  getTaskById(id: string): Promise<Task | null> {
    throw new Error("Method not implemented.");
  }

  async createTask(task: Task): Promise<any> {
    const data = {
      idList: ID_LIST,
      name: task.nombre,
      desc: task.descripcion,

    };
    return await this.http.post(`${API_URL}cards`, data).toPromise();
  }

  async getTask(): Promise<Task[]> {
    const data = await this.http.get(API_URL + '/lists/' + ID_LIST + '/cards').toPromise();

    let list: Task[] = []; // Declare list outside the if block

    if (Array.isArray(data)) {
      list = data.map(card => ({
        id: card.id,
        nombre: card.name,
        descripcion: card.desc,
        prioridad: 'Planeacion',
        estado: true
      }));
    }

    return list;
  }

  async updateTask(id: string, updatedTask: Task): Promise<boolean> {
    const data = {
      name: updatedTask.nombre,
      desc: updatedTask.descripcion,
      due: null, // Puedes añadir la fecha de vencimiento si es necesario
      idList: ID_LIST
    };
    await this.http.put(`${API_URL}/cards/${id}`, data).toPromise();
    return true;
  }

  async deleteTask(id: string): Promise<boolean> {
    console.log("service");

    return await this.http.delete(`${API_URL}/cards/${id}`).toPromise()
    .then(() => {
      console.log(`Task with ID ${id} deleted successfully.`);
      return true;
    } )
    .catch(error => {
      console.error(`Error deleting task with ID ${id}:`, error);
      return false;
    });


  }
}
