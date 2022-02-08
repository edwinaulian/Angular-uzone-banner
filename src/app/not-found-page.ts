import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'uzone-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="error-template">
            <h1>
            Oops!</h1>
            <h2>
            404 Not Found</h2>
            <div class="error-details">
              Sorry, an error has occured, Requested page not found!
            </div>
            <div class="error-actions">
              <a [routerLink]="['/']" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-home"></span>
              Go to home </a><a [routerLink]="['/contact-us']" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-envelope"></span> Contact Support </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    :host {
      text-align: center;
    }
  `,
  ],
})
export class NotFoundPageComponent {}
