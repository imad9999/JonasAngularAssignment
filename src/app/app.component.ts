import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PizzaOrderingSystem';
  public price = 0;
  public listOfPizzas: Pizza[] = [];


  public toppingAdded(pizzaSize, toppingPrice, toppingType, id, toppingName) {
    const isCheckBoxSelected = (document.getElementById(id) as HTMLInputElement).checked;
    const pizza = this.listOfPizzas.find(t => t.size === pizzaSize);
    if (pizza !== undefined) {
      if (isCheckBoxSelected) {
        pizza.pizzaToppings.push({ name: toppingName, price: toppingPrice, type: toppingType })
      } else {
        pizza.pizzaToppings = pizza.pizzaToppings.filter(t => t.name !== toppingName)
      }
    }
  }

  public addPizza(pizzaSize) {
      this.listOfPizzas.push({ size: pizzaSize, pizzaToppings: [] })
    }  

  public calculateTotalPrice() {
    let individualPizzaPrice = [];
    this.listOfPizzas.map(item => {
      const sizePrice = PizzaSize[item.size];
      let toppingsPrice = 0;
      item.pizzaToppings.map(topping => toppingsPrice += topping.price);
      let eachPizzaPrice = sizePrice+toppingsPrice;
      individualPizzaPrice.push(eachPizzaPrice);
    })
    let totalPrice = 0;
     individualPizzaPrice.map(item => totalPrice += item);
     this.price = totalPrice;
  }

  public calculatePizzaCount(pizzaSize) {
    return this.listOfPizzas.filter(item => item.size === pizzaSize).length;
  }
}

export enum PizzaSize {
  small = 5,
  medium = 7,
  large = 8,
  extraLarge = 9
}

export class Pizza {
  size: PizzaSize;
  pizzaToppings: PizzaTopping[];
}

export class PizzaTopping {
  name: string;
  price: number;
  type: string;
}




