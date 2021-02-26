const moment = require('moment'),
  supertest = require('supertest'),
  dotenv = require('dotenv'),
  { VALIDATION_ERROR } = require('../reusables/constants');
const records = require('../services/records');

dotenv.config();

const APP_URI = `http://localhost:${process.env.PORT}`,
  request = supertest(APP_URI),
  END_POINT = '/fetch';

describe('POST /fetch endpoint', () => {

  it('Should return Success on valid request body', async (done) => {
    const minCount = 2700, maxCount = 2800, startDate = '2015-01-01', endDate = '2019-01-01';
    const {
      body
    } = await request.post(END_POINT).send({
      startDate,
      endDate,
      minCount,
      maxCount
    });

    expect(body.code).toEqual(0);
    expect(body.msg).toEqual('Success');
    expect(Array.isArray(body.records)).toBe(true);
    body.records.forEach((record) => {
      expect(record.key).toBeDefined();
      expect(record.totalCount >= minCount && record.totalCount <= maxCount).toBe(true);
      expect(moment(record.createdAt).isBetween(startDate, endDate)).toBe(true);
      expect(record.createdAt).toBeDefined();
      expect(record.totalCount).toBeDefined();
    });

    done();
  });

  it('Should return VALIDATION ERROR on Improper payload parameter [minCount]', async (done) => {
    const {
      body
    } = await request.post(END_POINT).send({
      startDate: '2015-01-01',
      endDate: '2019-01-01',
      minCount: '2700',
      maxCount: 2800,
    });

    expect(body.records).toBeUndefined();
    expect(body.detail).toMatch(/minCount/);
    expect(body.detail).toMatch(/number/);
    expect(body.code).toEqual(1);
    expect(body.msg).toEqual('Failure');
    expect(body.error).toEqual(VALIDATION_ERROR);

    done();
  });

  it('Should return VALIDATION ERROR on Improper payload parameter [maxCount]', async (done) => {
    const {
      body
    } = await request.post(END_POINT).send({
      startDate: '2015-01-01',
      endDate: '2019-01-01',
      minCount: 2700,
      maxCount: '2800',
    });

    expect(body.records).toBeUndefined();
    expect(body.code).toEqual(1);
    expect(body.msg).toEqual('Failure');
    expect(body.error).toEqual(VALIDATION_ERROR);
    expect(body.detail).toMatch(/maxCount/);
    expect(body.detail).toMatch(/number/);
    done();
  });

  it('Should return VALIDATION ERROR on Improper payload parameter [startDate]', async (done) => {
    const {
      body
    } = await request.post(END_POINT).send({
      startDate: 'Invalid date format/value',
      endDate: '2015-01-01',
      minCount: 2700,
      maxCount: 2800,
    });

    expect(body.records).toBeUndefined();
    expect(body.code).toEqual(1);
    expect(body.msg).toEqual('Failure');
    expect(body.error).toEqual(VALIDATION_ERROR);
    expect(body.detail).toMatch(/startDate/);
    expect(body.detail).toMatch(/YYYY-MM-DD/);

    done();
  });

  it('Should return VALIDATION ERROR on Improper payload parameter [endDate]', async (done) => {
    const {
      body
    } = await request.post(END_POINT).send({
      startDate: '2015-01-01',
      endDate: 'Invalid date format/value',
      minCount: 2700,
      maxCount: 2800,
    });

    expect(body.records).toBeUndefined()
    expect(body.code).toEqual(1);
    expect(body.msg).toEqual('Failure');
    expect(body.error).toEqual(VALIDATION_ERROR);
    expect(body.detail).toMatch(/endDate/);
    expect(body.detail).toMatch(/YYYY-MM-DD/);

    done();
  });

});