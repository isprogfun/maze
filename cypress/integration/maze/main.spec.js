describe("Main spec", () => {
  it("Opens the app", () => {
    cy.visit("http://localhost:3000");
  });

  it("Shows initial state", () => {
    cy.get(".cy-initial-state").find(".cy-initial-state-select-name");
    cy.get(".cy-initial-state").find(".cy-initial-state-button-start");
  });

  it("Switches to game state after starting a game", () => {
    cy.intercept(
      {
        method: "POST",
        url: "**/maze",
      },
      {
        statusCode: 200,
        body: {
          maze_id: "6658da7b-87bb-4179-bd30-a5d52eaa2ffb",
        },
      }
    );

    cy.intercept(
      {
        method: "GET",
        url: "**/maze/6658da7b-87bb-4179-bd30-a5d52eaa2ffb/print",
      },
      {
        fixture: "maze.txt",
      }
    );

    cy.get(".cy-initial-state").find(".cy-initial-state-button-start").click();
    cy.get(".cy-game-state").find(".cy-game-state-actions");
  });
});
