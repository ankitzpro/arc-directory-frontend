import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  @Input() nodes;

  addType = 'file';
  name = '';
  constructor(private appService: AppService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.nodes = this.appService.processNodes(this.nodes);
  }

  onFolderButtonClick(folder) {
    folder['expand'] = !folder['expand'];
  }

  trackNode(index, folder) {
    return folder.name;
  }

  delete(node) {
    if(confirm('Are you sure you would like to delete?')){
    this.appService.deleteData(node.type, node.id).subscribe(data => {
      if (data.status == 200) {
        this.nodes = this.nodes.filter((m) => m.id !== node.id);
        this.cdr.detectChanges();
      }
    });
  }
  }

  save(node) {
    if(this.name && this.name.length > 0){
    this.appService.saveData(this.name, this.addType, node.id).subscribe(data => {
      if (data.status == 200) {
        node.children.push(data.data);
      }
    });
  }
  else{
    alert('Please enter a name for file or folder !!!');
  }
}
}
