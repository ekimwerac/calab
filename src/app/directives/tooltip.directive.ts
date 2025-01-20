import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = ''; // Tooltip text passed via input
  private tooltipElement!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Create the tooltip element and style it
  private createTooltip(): void {
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'background', '#000');
    this.renderer.setStyle(this.tooltipElement, 'color', '#fff');
    this.renderer.setStyle(this.tooltipElement, 'padding', '5px');
    this.renderer.setStyle(this.tooltipElement, 'borderRadius', '4px');
    this.renderer.setStyle(this.tooltipElement, 'fontSize', '12px');
    this.renderer.setStyle(this.tooltipElement, 'whiteSpace', 'nowrap');
    this.renderer.setStyle(this.tooltipElement, 'zIndex', '1000');
    this.renderer.setStyle(this.tooltipElement, 'top', `${this.el.nativeElement.offsetHeight + 5}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', '0px');
    this.renderer.setProperty(this.tooltipElement, 'innerHTML', this.tooltipText);
  }

  // Show the tooltip
  private showTooltip(): void {
    if (!this.tooltipElement) {
      this.createTooltip();
    }
    this.renderer.setStyle(this.tooltipElement, 'display', 'block');
  }

  // Hide the tooltip
  private hideTooltip(): void {
    if (this.tooltipElement) {
      this.renderer.setStyle(this.tooltipElement, 'display', 'none');
    }
  }

  // Listen for mouseenter and call showTooltip
  @HostListener('mouseenter') onMouseEnter(): void {
    this.showTooltip();
  }

  // Listen for mouseleave and call hideTooltip
  @HostListener('mouseleave') onMouseLeave(): void {
    this.hideTooltip();
  }

  // Cleanup on directive destroy
  ngOnDestroy(): void {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
    }
  }
}
