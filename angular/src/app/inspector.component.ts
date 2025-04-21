import {Component, EventEmitter, Output} from "@angular/core"

import { Node, Base, Vertex, Edge } from "@jsplumbtoolkit/browser-ui"
import {InspectorComponent} from "@jsplumbtoolkit/browser-ui-angular"

@Component({
  template:`

    <div class="jtk-orgchart-inspector" *ngIf="current != null">
      <h1>{{current.data['name']}}</h1>
      <h2>{{current.data['title']}}</h2>
      @if(reports.length > 0) {
        <h5>Reports:</h5>
        
        @for(r of reports;track r) {
          <app-inspector-person [person]="r" (personSelected)="selectPerson($event)"></app-inspector-person>
        }
      }
      @if(manager != null) {
        <h5>Reports to:</h5>
        <app-inspector-person [person]="manager" (personSelected)="selectPerson($event)"></app-inspector-person>
      }
    </div>`,
  selector:"app-inspector"
})
export class OrgChartInspectorComponent extends InspectorComponent {

  current!:Node|null
  reports:Array<Vertex> = []
  manager!:Node|null

  @Output() personSelected:EventEmitter<Vertex> = new EventEmitter<Vertex>()

  retrieveDirectReports(person:Node){
    this.reports = person.getSourceEdges().map(e => e.target)
  }

  getManager(person:Node) {
    this.manager = person.getTargetEdges().map((e:Edge) => e.source)[0] as Node
  }

  selectPerson(person:Vertex) {
    this.personSelected.emit(person)
  }

  override reset() {
    this.current = null
    this.manager = null
    this.reports.length = 0
    super.reset()
  }

  override refresh(obj:Base) {
    this.current = obj as Node
    this.retrieveDirectReports(this.current)
    this.getManager(this.current)
  }

}
