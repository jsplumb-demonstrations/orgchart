import {Component, inject, ViewChild} from '@angular/core'
import {AnchorLocations, BlankEndpoint, DEFAULT, EVENT_CANVAS_CLICK, EVENT_TAP, HierarchyLayout, Node,
  PlainArrowOverlay,
  Surface,
  Vertex} from '@jsplumbtoolkit/browser-ui'
import {BrowserUIAngular, jsPlumbService, SurfaceComponent} from "@jsplumbtoolkit/browser-ui-angular"
import {PersonComponent} from "./person.component"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orgchart';

  @ViewChild(SurfaceComponent) surfaceComponent!: SurfaceComponent

  toolkit!: BrowserUIAngular
  surface!: Surface

  $jsplumb = inject(jsPlumbService)

  ngAfterViewInit() {

    this.surface = this.surfaceComponent.surface
    this.toolkit = this.surfaceComponent.toolkit

    this.toolkit.load({
      url:'/assets/dataset.json'
    })
  }

  selectPerson(p:Vertex) {
    this.toolkit.setSelection(p)
    this.surface.centerOnAndZoom(p, 0.15)
  }


  renderParams = {
      consumeRightClick:false,
      elementsDraggable:false,
      defaults:{
        endpoint:BlankEndpoint.type,
        anchor:AnchorLocations.ContinuousTopBottom
      },
      events: {
        [EVENT_CANVAS_CLICK]: (e:Event) => {
          this.toolkit.clearSelection()
        }
    },
    zoomToFit:true,
    layout:{
      type: HierarchyLayout.type
    }
  }

  view = {
    nodes:{
      [DEFAULT]:{
        events:{
          [EVENT_TAP]:(p:{obj:Node}) => {
            this.selectPerson(p.obj)
          }
        },
        component:PersonComponent
      }

    },
    edges:{
      default:{
        overlays:[
          {
            type:PlainArrowOverlay.type,
            options:{
              location:1,
              width:10,
              length:10
            }
          }
        ]
      }
    }
  }
}
