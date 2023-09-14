import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CpfCnpjDirective } from './diretivas/cpfcnpj.directive';
import { CepDirective } from './diretivas/cep.directive';
import { PhoneDirective } from './diretivas/phone.directive';
import {
  faAdjust,
  faAlignJustify,
  faArrowRight,
  faBars,
  faBook,
  faCaretDown,
  faCaretUp,
  faCheck,
  faClipboardCheck,
  faClock,
  faClone,
  faCloudUploadAlt,
  faCog,
  faDownload,
  faEdit,
  faExclamationTriangle,
  faFilePdf,
  faFilter,
  faFlag,
  faGrinStars,
  faHistory,
  faHome,
  faLanguage,
  faLightbulb,
  faLink,
  faList,
  faPaintBrush,
  faPaperclip,
  faPlayCircle,
  faPlus,
  faPowerOff,
  faPrint,
  faQuestionCircle,
  faReply,
  faRocket,
  faSearch,
  faShare,
  faSquare,
  faStar as fasStar,
  faStream,
  faSun,
  faTasks,
  faTimes,
  faToggleOff,
  faToggleOn,
  faTrash,
  faUniversalAccess,
  faUpload,
  faUserCircle,
  faUsers,
  faWindowClose,
  faWindowMaximize,
  faWrench
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagram, faMediumM, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { NotificationService } from './notification.service';
import { LocalStorageService } from './local-storage.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomMatPaginator } from './custom-mat-paginator';
import { UtilFunction } from '../util/util.function';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { OnlyExclusiveNumberDirective } from './diretivas/only.exclusive.number.directive';
import { BottonSheetConfirmComponent } from './botton-sheet-confirm/botton-sheet-confirm.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatTreeModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ClipboardModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatRadioModule,
    MatStepperModule,
    MatRadioModule,
    MatButtonToggleModule,
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    DragDropModule,
    MatDialogModule
  ],
  declarations: [
    BreadcrumbsComponent,
    BottonSheetConfirmComponent,

    CpfCnpjDirective,
    CepDirective,
    PhoneDirective,
    OnlyExclusiveNumberDirective
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatTreeModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ClipboardModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatRadioModule,
    MatStepperModule,
    MatRadioModule,
    MatButtonToggleModule,
    FontAwesomeModule,
    DragDropModule,
    MatDialogModule,
    FlexLayoutModule,
    CpfCnpjDirective,
    CepDirective,
    PhoneDirective,
    OnlyExclusiveNumberDirective,

    //Components
    BreadcrumbsComponent,
    BottonSheetConfirmComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginator },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    NotificationService,
    LocalStorageService,
    UtilFunction
  ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faBars,
      faUserCircle,
      faPowerOff,
      faCog,
      faRocket,
      faPlayCircle,
      faGithub,
      faMediumM,
      faTwitter,
      faInstagram,
      faYoutube,
      faPlus,
      faEdit,
      faTrash,
      faTimes,
      faCaretUp,
      faCaretDown,
      faExclamationTriangle,
      faFilter,
      faTasks,
      faCheck,
      faSquare,
      faLanguage,
      faPaintBrush,
      faLightbulb,
      faWindowMaximize,
      faStream,
      faBook,
      faToggleOn,
      faToggleOff,
      faHistory,
      faSearch,
      faLink,
      faShare,
      faList,
      faUsers,
      faTimes,
      faGrinStars,
      faArrowRight,
      faCloudUploadAlt,
      faDownload,
      faUniversalAccess,
      faFlag,
      faAdjust,
      faSun,
      faHome,
      faSun,
      faUpload,
      faFilePdf,
      faReply,
      faWrench,
      faQuestionCircle,
      faAlignJustify,
      faClone,
      faPrint,
      faWindowClose,
      faClipboardCheck,
      faClock,
      fasStar,
      farStar,
      faPaperclip
    );
  }
}
