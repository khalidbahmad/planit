<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('notifications', function (Blueprint $table) { 
        $table->id('idNotification'); 
        $table->text('message'); 
        $table->timestamp('dateEnvoi')->useCurrent(); 
        $table->string('type'); 
        $table->unsignedBigInteger('idUtilisateur'); 
        $table->foreign('idUtilisateur')->references('idUtilisateur')->on('utilisateurs')->onDelete('cascade'); 
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
