const assert = require("assert");
const sinon = require("sinon");
const mongoose = require("mongoose");
const ProjectExpenseClaims = require("../models/projectExpenseClaimModel");
const {
  updateProjectExpenseClaims,
  deleteProjectExpenseClaims,
} = require("../controller/claims");

describe("updateProjectExpenseClaims", () => {
  let findOneAndUpdateStub;

  beforeEach(() => {
    findOneAndUpdateStub = sinon.stub(ProjectExpenseClaims, "findOneAndUpdate");
  });

  afterEach(() => {
    findOneAndUpdateStub.restore();
  });

  it("should update an existing project expense claim", async () => {
    const fakeExpense = { _id: "123", claimId: "456" };
    const req = { body: fakeExpense };
    findOneAndUpdateStub
      .withArgs({ claimId: "456" }, fakeExpense, { returnDocument: "after" })
      .resolves(fakeExpense);
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await updateProjectExpenseClaims(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, {
      message: "Project Expense Claims successfully updated!",
      expense: fakeExpense,
    });
  });

  it("should return a 404 error if the expense claim is not found", async () => {
    const fakeExpense = { _id: "123", claimId: "456" };
    const req = { body: fakeExpense };
    findOneAndUpdateStub
      .withArgs({ claimId: "456" }, fakeExpense, { returnDocument: "after" })
      .resolves(null);
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await updateProjectExpenseClaims(req, res);

    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.json, {
      message: "cannot find expense with ID 456",
    });
  });
});

describe("deleteProjectExpenseClaims", () => {
  let findOneAndDeleteStub;

  beforeEach(() => {
    findOneAndDeleteStub = sinon.stub(ProjectExpenseClaims, "findOneAndDelete");
  });

  afterEach(() => {
    findOneAndDeleteStub.restore();
  });

  it("should delete an existing project expense claim", async () => {
    const req = { query: { claimId: "456" } };
    findOneAndDeleteStub
      .withArgs({ claimId: "456" })
      .resolves({ _id: "123", claimId: "456" });
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await deleteProjectExpenseClaims(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, {
      message: "Expense Claim deleted successfully",
      projectExpenseClaims: { _id: "123", claimId: "456" },
    });
  });

  it("should return a 404 error if the expense claim is not found", async () => {
    const req = { query: { claimId: "456" } };
    findOneAndDeleteStub.withArgs({ claimId: "456" }).resolves(null);
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await deleteProjectExpenseClaims(req, res);

    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.json, {
      message: "cannot find Expense Claim with ID 456",
    });
  });
});
