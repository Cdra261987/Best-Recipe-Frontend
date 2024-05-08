import { Component, OnInit } from "@angular/core";
import { NavBarComponent } from "../../../components/navbar/navbar.component";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector: 'recipe-edit',
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.css',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NavBarComponent]
})
export class RecipePageEdit implements OnInit {

    formRecipe!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.formRecipe = this.fb.group({
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            duration: new FormControl(0, [Validators.required]),
            difficulty: new FormControl(0, [Validators.required])
        })
    }

    onCreate(): void {}
}