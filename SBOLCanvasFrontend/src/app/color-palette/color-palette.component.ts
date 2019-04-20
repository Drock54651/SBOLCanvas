import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MccColorPickerItem, MccColorPickerService } from 'material-community-components';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MetadataService} from '../metadata.service';
import {GraphService} from '../graph.service';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.css']
})
export class ColorPaletteComponent implements OnInit {

  // @Output() colorChanged = new EventEmitter<string>();
  selectedColor: string;
  form: FormGroup;

  usedStart: string[] = [
    '#FF3380',
    '#CCCC00',
    '#66E64D',
    '#4D80CC',
    '#9900B3',
    '#E64D66',
    '#4DB380',
    '#FF4D4D',
    '#99E6E6',
    '#6666FF'
    ];

  colors: string[] = [
    '#FF6633',
    '#FFB399',
    '#FF33FF',
    '#FFFF99',
    '#00B3E6',
    '#E6B333',
    '#3366E6',
    '#999966',
    '#99FF99',
    '#B34D4D',
    '#80B300',
    '#809900',
    '#E6B3B3',
    '#6680B3',
    '#66991A',
    '#FF99E6',
    '#CCFF1A',
    '#FF1A66',
    '#E6331A',
    '#33FFCC',
    '#66994D',
    '#B366CC',
    '#4D8000',
    '#B33300',
    '#CC80CC',
    '#66664D',
    '#991AFF',
    '#E666FF',
    '#4DB3FF',
    '#1AB399',
    '#E666B3',
    '#33991A',
    '#CC9999',
    '#B3B31A',
    '#00E680',
    '#4D8066',
    '#809980',
    '#E6FF80',
    '#1AFF33',
    '#999933',
    '#FF3380',
    '#CCCC00',
    '#66E64D',
    '#4D80CC',
    '#9900B3',
    '#E64D66',
    '#4DB380',
    '#FF4D4D',
    '#99E6E6',
    '#6666FF',
  ];

  items: MccColorPickerItem[] = [
    { text: 'Black', value: '#000000' },
    { text: 'White', value: '#FFFFFF' },
    { text: 'Gray', value: '#CCCCCC' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private mccColorPickerService: MccColorPickerService,
    private metadataService: MetadataService,
    private graphService: GraphService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      selectedColor: ['#000000', Validators.required],
    });


    // Subscribe to the color metadata
    this.metadataService.color.subscribe(color => this.colorUpdated(color));
  }

  reset(): void {
    this.mccColorPickerService.resetUseColors();
  }

  onSubmit({ value, valid }): void {
    console.log(value, valid);
  }

  showColor($event) {
    this.metadataService.setColor($event);
  }

  colorUpdated(color: string) {
    console.log('changing color in picker');
    this.selectedColor = color;

    // Update the graph as well.
    this.graphService.updateSelectedCellColor(this.selectedColor);
  }

}
