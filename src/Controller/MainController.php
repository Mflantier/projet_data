<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController{

    /**
     * @Route("/", name="home")
     */
    public function home(){
        return $this->render('views/home.html.twig', ['title' => 'Home']);
    }
    
    /**
     * @Route("/jeu", name="jeu")
     */
    public function jeu(){
        return $this->render('views/jeu.html.twig', ['title' => 'Jeu']);
    }

}