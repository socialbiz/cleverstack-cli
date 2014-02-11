var chai      = require( 'chai' )
  , expect    = chai.expect
  , exec      = require('child_process').exec
  , path      = require( 'path' )
  , rimraf    = require( 'rimraf' )
  , fs        = require( 'fs' )
  , binPath   = path.join( __dirname, '..', 'bin' )
  , assetPath = path.join( __dirname, 'assets' );

chai.Assertion.includeStack = true;

describe( 'Generate', function ( ) {
  describe( 'backend seed', function ( ) {
    describe( 'controller', function ( ) {
      before( function ( done ) {
        rimraf( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2' ), done );
      } );

      after( function ( done ) {
        rimraf( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2' ), done );
      } );

      it( 'should be able to create', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' controller Testing2', { cwd: path.join( assetPath, 'my-new-project', 'backend', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.not.match( /already exists within/ );

          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'config' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'controllers', 'Testing2Controller.js' ) ) ).to.be.true;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'models' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'schema' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'services' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'tasks' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'tests' ) ) ).to.be.false;

          var controller = fs.readFileSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'controllers', 'Testing2Controller.js' ) );
          expect( controller ).to.match( /module\.exports = function\( Testing2Service \) \{/ );
          expect( controller ).to.match( /service: Testing2Service/ );
          expect( controller ).to.match( /message: "Hello from customAction inside Testing2Controller"/ );

          done( err );
        } );
      } );

      it( 'should have trouble creating an existing controller', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' controller Testing2', { cwd: path.join( assetPath, 'my-new-project', 'backend', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.match( /Testing2Controller\.js already exists within/ );
          done( err );
        } );
      } );
    } );

    describe( 'models', function ( ) {
      after( function ( done ) {
        rimraf( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2' ), done );
      } );

      it( 'should be able to create', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' model Testing2', { cwd: path.join( assetPath, 'my-new-project', 'backend', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.not.match( /already exists within/ );

          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'config' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'controllers' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'models', 'odm', 'Testing2Model.js' ) ) ).to.be.true;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'models', 'odm', 'Testing2Model.js' ) ) ).to.be.true;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'schema' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'services' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'tasks' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'tests' ) ) ).to.be.false;

          var odmModel = fs.readFileSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'models', 'odm', 'Testing2Model.js' ) );
          expect( odmModel ).to.match( /return mongoose\.model\('Testing2', ModelSchema\);/ );

          var ormModel = fs.readFileSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'models', 'orm', 'Testing2Model.js' ) );
          expect( ormModel ).to.match( /return sequelize.define\("Testing2", \{/ );

          done( err );
        } );
      } );

      it( 'should have trouble creating an existing model', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' model Testing2', { cwd: path.join( assetPath, 'my-new-project', 'backend', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.match( /Testing2Model\.js already exists within/ );
          done( err );
        } );
      } );
    } );

    describe( 'services', function ( ) {
      after( function ( done ) {
        rimraf( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2' ), done );
      } );

      it( 'should be able to create', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' service Testing2', { cwd: path.join( assetPath, 'my-new-project', 'backend', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.not.match( /already exists within/ );

          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'config' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'controllers' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'models' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'schema' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'services', 'Testing2Service.js' ) ) ).to.be.true;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'tasks' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'tests' ) ) ).to.be.false;

          var service = fs.readFileSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'services', 'Testing2Service.js' ) );
          expect( service ).to.match( /Testing2Service = BaseService.extend\(\{/ );
          expect( service ).to.match( /Testing2Service\.instance = new Testing2Service\( sequelize \);/ );
          expect( service ).to.match( /Testing2Service\.Model = ORMTesting2Model;/ );
          expect( service ).to.match( /return Testing2Service\.instance;/ );

          done( err );
        } );
      } );

      it( 'should have trouble creating an existing service', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' service Testing2', { cwd: path.join( assetPath, 'my-new-project', 'backend', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.match( /Testing2Service\.js already exists within/ );
          done( err );
        } );
      } );
    } );

    describe( 'tasks', function ( ) {
      after( function ( done ) {
        rimraf( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2' ), done );
      } );

      it( 'should be able to create', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' task Testing2', { cwd: path.join( assetPath, 'my-new-project', 'backend', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.not.match( /already exists within/ );

          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'config' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'controllers' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'models' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'schema' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'services' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'tasks', 'Testing2Task.js' ) ) ).to.be.true;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'tests' ) ) ).to.be.false;

          var service = fs.readFileSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'tasks', 'Testing2Task.js' ) );
          expect( service ).to.match( /var Testing2Task = module\.exports = Class\.extend\(/ );

          done( err );
        } );
      } );

      it( 'should have trouble creating an existing task', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' task Testing2', { cwd: path.join( assetPath, 'my-new-project', 'backend', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.match( /Testing2Task\.js already exists within/ );
          done( err );
        } );
      } );
    } );

    describe( 'test', function ( ) {
      after( function ( done ) {
        rimraf( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2' ), done );
      } );

      it( 'should be able to create', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' test Testing2', { cwd: path.join( assetPath, 'my-new-project', 'backend', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.not.match( /already exists within/ );

          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'config' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'controllers' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'models' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'schema' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'services' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'tasks' ) ) ).to.be.false;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'tests', 'integration', 'Testing2Test.js' ) ) ).to.be.true;
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'tests', 'unit', 'Testing2Test.js' ) ) ).to.be.true;

          var testInt = fs.readFileSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'tests', 'integration', 'Testing2Test.js' ) );
          expect( testInt ).to.match( /describe \( '\/testing2', function \(\) \{/ );
          expect( testInt ).to.match( /describe \( 'POST \/testing2', function \(\) \{/ );
          expect( testInt ).to.match( /describe \( 'GET \/testing2', function \(\) \{/ );
          expect( testInt ).to.match( /describe \( 'GET \/testing2\/:id', function \(\) \{/ );
          expect( testInt ).to.match( /describe \( 'PUT \/testing2\/:id', function \(\) \{/ );
          expect( testInt ).to.match( /describe \( 'DELETE \/testing2\/:id', function \(\) \{/ );
          expect( testInt ).to.match( /describe \( 'GET \/testing2\/custom', function \(\) \{/ );
          expect( testInt ).to.match( /message: 'Hello from customAction inside Testing2Controller'/ );

          var testUnit = fs.readFileSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'tests', 'unit', 'Testing2Test.js' ) );
          expect( testUnit ).to.match( /describe \( 'controllers\.Testing2Controller', function \(\) \{/ );
          expect( testUnit ).to.match( /testEnv \( function \( Testing2Controller, Testing2Service \) \{/ );
          expect( testUnit ).to.match( /message: 'Hello from customAction inside Testing2Controller'/ );

          done( err );
        } );
      } );

      it( 'should have trouble creating an existing test', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' test Testing2', { cwd: path.join( assetPath, 'my-new-project', 'backend', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.match( /Testing2Test\.js already exists within/ );
          done( err );
        } );
      } );
    } );
  } );

  describe( 'frontend seed', function ( ) {
    describe( 'controller', function ( ) {
      after( function ( done ) {
        rimraf( path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules', 'Testing2' ), done );
      } );

      it( 'should be able to generate a controller within the frontend seed', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' controller Testing2', { cwd: path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.not.match( /already exists within/ );

          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules', 'Testing2', 'controllers', 'testing2_controller.js' ) ) ).to.be.true;

          var controller = fs.readFileSync( path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules', 'Testing2', 'controllers', 'testing2_controller.js' ) );
          expect( controller ).to.match( /ng\.module\('testing2.controllers'\)/ );
          expect( controller ).to.match( /\.controller\('Testing2Controller', \[/ );

          done( err );
        } );
      } );

      it( 'should have trouble creating an existant controller', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' controller Testing2', { cwd: path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.match( /already exists within/ );
          done( err );
        } );
      } );
    } );

    describe( 'directive', function ( ) {
      after( function ( done ) {
        rimraf( path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules', 'Testing2' ), done );
      } );

      it( 'should be able to generate a directive within the frontend seed', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' directive Testing2', { cwd: path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.not.match( /already exists within/ );

          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules', 'Testing2', 'directives', 'testing2_directive.js' ) ) ).to.be.true;

          var directive = fs.readFileSync( path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules', 'Testing2', 'directives', 'testing2_directive.js' ) );
          expect( directive ).to.match( /ng\.module\('testing2.directives'\)/ );
          expect( directive ).to.match( /\.directive\('Testing2Directive', function\(\) {/ );

          done( err );
        } );
      } );

      it( 'should have trouble creating an existant directive', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' directive Testing2', { cwd: path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.match( /already exists within/ );
          done( err );
        } );
      } );
    } );

    describe( 'factory', function ( ) {
      after( function ( done ) {
        rimraf( path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules', 'Testing2' ), done );
      } );

      it( 'should be able to generate a factory within the frontend seed', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' factory Testing2', { cwd: path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );

          expect( stdout ).to.not.match( /already exists within/ );
          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules', 'Testing2', 'factories', 'testing2_factory.js' ) ) ).to.be.true;

          var factory = fs.readFileSync( path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules', 'Testing2', 'factories', 'testing2_factory.js' ) );
          expect( factory ).to.match( /ng\.module\('testing2.factories'\)/ );
          expect( factory ).to.match( /\.factory\('Testing2Factory', function\(\){/ );

          done( err );
        } );
      } );

      it( 'should have trouble creating an existant factory', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' factory Testing2', { cwd: path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.match( /already exists within/ );
          done( err );
        } );
      } );
    } );

    describe( 'service', function ( ) {
      after( function ( done ) {
        rimraf( path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules', 'Testing2' ), done );
      } );

      it( 'should be able to generate a service within the frontend seed', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' service Testing2', { cwd: path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.not.match( /already exists within/ );

          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules', 'Testing2', 'services', 'testing2_service.js' ) ) ).to.be.true;

          var service = fs.readFileSync( path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules', 'Testing2', 'services', 'testing2_service.js' ) );
          expect( service ).to.match( /ng\.module\('testing2.services'\)/ );
          expect( service ).to.match( /\.service\('Testing2Service', \[/ );

          done( err );
        } );
      } );

      it( 'should have trouble creating an existant service', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' service Testing2', { cwd: path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.match( /already exists within/ );
          done( err );
        } );
      } );
    } );

    describe( 'views', function ( ) {
      after( function ( done ) {
        rimraf( path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules', 'Testing2' ), done );
      } );

      it( 'should be able to generate a view within the frontend seed', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' views Testing2', { cwd: path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.not.match( /already exists within/ );

          expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules', 'Testing2', 'views', 'testing2-view.html' ) ) ).to.be.true;

          var html = fs.readFileSync( path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules', 'Testing2', 'views', 'testing2-view.html' ) );
          expect( html ).to.match( /<h1>Testing2 Module<\/h1>/ );

          done( err );
        } );
      } );

      it( 'should have trouble creating an existant controller', function ( done ) {
        exec( path.join( binPath, 'clever-generate' ) + ' views Testing2', { cwd: path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules' ) }, function ( err, stdout, stderr ) {
          expect( stderr ).to.equal( '' );
          expect( stdout ).to.match( /already exists within/ );
          done( err );
        } );
      } );
    } );
  } );
} );
