var chai      = require( 'chai' )
  , expect    = chai.expect
  , exec      = require('child_process').exec
  , path      = require( 'path' )
  , crypto    = require( 'crypto' )
  , fs        = require( 'fs' )
  , binPath   = path.join( __dirname, '..', 'bin' )
  , assetPath = path.join( __dirname, 'assets' );

chai.Assertion.includeStack = true;

describe( 'Remove', function ( ) {
  before( function ( done ) {
    console.log( 'Installing clever-background-tasks and clever-datatables for tests...' );
    exec( path.join( binPath, 'clever-install' ) + ' clever-background-tasks', { cwd: path.join( assetPath, 'my-new-project' ) }, function ( err ) {
      console.log( '... done' );
      done( err );
    } );
  } );

  describe( 'it should fail', function ( ) {
    it( 'to remove a non-existant module', function ( done ) {
      var moduleName = crypto.randomBytes( 20 ).toString( 'hex' );
      exec( path.join( binPath, 'clever-remove' ) + ' ' + moduleName, { cwd: path.join( assetPath, 'my-new-project' )  }, function ( err, stdout, stderr ) {
        expect( stderr ).to.equal( '' );
        expect( stdout ).to.match( /There are no modules to remove./ );
        done( err );
      } );
    } );

    it( 'to remove an existant module, but in the wrong seed (frontend module)', function ( done ) {
      exec( path.join( binPath, 'clever-remove' ) + ' clever-datatables', { cwd: path.join( assetPath, 'my-new-project', 'backend' )  }, function ( err, stdout, stderr ) {
        expect( stderr ).to.equal( '' );
        expect( stdout ).to.match( /There are no modules to remove./ );
        done( err );
      } );
    } );

    it( 'to remove an existant module, but in the wrong seed (backend module)', function ( done ) {
      exec( path.join( binPath, 'clever-remove' ) + ' clever-background-tasks', { cwd: path.join( assetPath, 'my-new-project', 'frontend' ) }, function ( err, stdout, stderr ) {
        expect( stderr ).to.equal( '' );
        expect( stdout ).to.match( /There are no modules to remove./ );
        done( err );
      } );
    } );
  } );

  describe( 'should not fail', function ( ) {
    it( 'should remove a backend module', function ( done ) {
      exec( path.join( binPath, 'clever-remove' ) + ' clever-background-tasks', { cwd: path.join( assetPath, 'my-new-project' ) }, function ( err, stdout, stderr ) {
        expect( stderr ).to.equal( '' );
        expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'clever-background-tasks' ) ) ).to.be.false;

        if (require.cache[ path.join( assetPath, 'my-new-project', 'backend', 'package.json' ) ]) {
          delete require.cache[ require.resolve( path.join( assetPath, 'my-new-project', 'backend', 'package.json' ) ) ];
        }

        var projPkg = require( path.join( assetPath, 'my-new-project', 'backend', 'package.json' ) );
        expect( projPkg ).to.have.property( 'bundledDependencies' );
        expect( projPkg.bundledDependencies ).to.not.include( 'clever-background-tasks' );

        done( err );
      } );
    } );

    it( 'should remove a frontend module', function ( done ) {
      exec( path.join( binPath, 'clever-remove' ) + ' clever-datatables', { cwd: path.join( assetPath, 'my-new-project' ) }, function ( err, stdout, stderr ) {
        expect( stderr ).to.equal( '' );
        expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'frontend', 'app', 'modules', 'cs_datatables' ) ) ).to.be.false;
        done( err );
      } );
    } );
  } );
} );
