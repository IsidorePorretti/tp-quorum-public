package org.cheese.beaufort;

class Dummy {

  public void miam() {
    eat();
  }

  private void eat() {
    thronw new IllegalStateException("No more cheese left!");
  }

}
